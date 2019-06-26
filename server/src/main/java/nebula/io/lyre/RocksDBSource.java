package nebula.io.lyre;

import org.rocksdb.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.FileSystemUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class RocksDBSource {

    @Value("${lyre.datasource.location}")
    private String datasourceLocation;

    public RocksDBSource() {
        RocksDB.loadLibrary();


    }

    @PostConstruct
    void initialize() {
        final ColumnFamilyOptions cfOpts = new ColumnFamilyOptions().optimizeUniversalStyleCompaction();

        final List<ColumnFamilyDescriptor> cfDescriptors = Arrays.asList(
                new ColumnFamilyDescriptor(RocksDB.DEFAULT_COLUMN_FAMILY, cfOpts),
                new ColumnFamilyDescriptor("my-first-columnfamily".getBytes(), cfOpts)
        );

        final List<ColumnFamilyHandle> columnFamilyHandleList =
                new ArrayList<>();

        try {
            FileSystemUtils.deleteRecursively(new File(datasourceLocation));

            final DBOptions options = new DBOptions()
                    .setCreateIfMissing(true)
                    .setCreateMissingColumnFamilies(true);


            final RocksDB db = RocksDB.open(options,
                    datasourceLocation, cfDescriptors,
                    columnFamilyHandleList);

            byte[] key = "1".getBytes();

            byte[] value = db.get(key);
            if (value == null)
                value = "0".getBytes();

            db.put(key, Integer.valueOf(new String(value)).toString().getBytes());
        } catch (RocksDBException e) {
            e.printStackTrace();
        }
    }


}

