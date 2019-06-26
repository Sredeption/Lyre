package nebula.io.lyre;

import graphql.*;
import graphql.language.SourceLocation;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static io.netty.handler.codec.http.HttpResponseStatus.BAD_REQUEST;
import static io.netty.handler.codec.http.HttpResponseStatus.OK;

@Component
public class GraphQLVerticle extends AbstractVerticle {

    private static final Logger log = LoggerFactory.getLogger(GraphQLVerticle.class);

    private final GraphQL graphQL;

    @Autowired
    public GraphQLVerticle(GraphQL graphQL) {
        this.graphQL = graphQL;
    }

    @Override
    public void start() {

        Router router = Router.router(vertx);

        router.route("/graphql").handler(rc -> {
            rc.request().bodyHandler(rh -> {
                String query = rh.toString();
                handleQuery(rc, query);
            });
        });

        vertx.createHttpServer().requestHandler(router).listen(8080);
    }

    private void handleQuery(RoutingContext rc, String json) {
        JsonObject request = new JsonObject(json);
        ExecutionInput.Builder builder = ExecutionInput.newExecutionInput();
        String query = request.getString("query");
        if (query != null)
            builder.query(query);
        String operationName = request.getString("operationName");
        if (operationName != null)
            builder.operationName(operationName);
        JsonObject variables = request.getJsonObject("variables");
        if (variables != null)
            builder.variables(variables.getMap());
        ExecutionInput executionInput = builder.build();

        CompletableFuture<ExecutionResult> resultFuture = graphQL.executeAsync(executionInput);
        resultFuture.thenAccept(result -> {
            JsonObject response = new JsonObject();

            List<GraphQLError> errors = result.getErrors();

            if (!errors.isEmpty()) {
                JsonArray jsonErrors = new JsonArray();
                response.put("errors", jsonErrors);
                for (GraphQLError error : errors) {
                    if (error instanceof ExceptionWhileDataFetching) {
                        ((ExceptionWhileDataFetching) error).getException().printStackTrace();
                    }
                    JsonObject jsonError = new JsonObject();
                    jsonError.put("message", error.getMessage());
                    jsonError.put("type", error.getErrorType());
                    if (error.getLocations() != null && !error.getLocations().isEmpty()) {
                        JsonArray errorLocations = new JsonArray();
                        jsonError.put("locations", errorLocations);
                        for (SourceLocation location : error.getLocations()) {
                            JsonObject errorLocation = new JsonObject();
                            errorLocation.put("line", location.getLine());
                            errorLocation.put("column", location.getLine());
                            errorLocations.add(errorLocation);
                        }
                    }
                    jsonErrors.add(jsonError);
                }
            }
            if (result.getData() != null) {
                Map<String, Object> data = result.getData();
                response.put("data", data);
            }

            HttpResponseStatus statusCode = (result.getErrors() != null && !result.getErrors().isEmpty())
                    ? BAD_REQUEST : OK;
            rc.response().putHeader("Content-Type", "application/json");
            rc.response().setStatusCode(statusCode.code());
            rc.response().end(response.toString());
        });

    }

}
