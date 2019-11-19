package nebula.io.lyre;

import io.vertx.core.Vertx;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class Application {

    private final GraphQLVerticle graphQLVerticle;

    @Autowired
    public Application(GraphQLVerticle graphQLVerticle) {
        this.graphQLVerticle = graphQLVerticle;
    }

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    @PostConstruct
    public void deployVerticle() {
        Vertx.vertx().deployVerticle(graphQLVerticle);
    }
}
