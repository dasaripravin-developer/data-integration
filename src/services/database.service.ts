import mongoose from "mongoose";
import { logger } from "../utils/logger";

export interface DatabaseConfig {
     host: string | undefined;
     port: number | string | undefined;
     dbName: string | undefined;
}

export class Database {
     private config: DatabaseConfig;
     constructor(config?: DatabaseConfig) {
          this.config = config ?? { host: "0.0.0.0", port: 27017, dbName: "db" };
     }

     async connect() {
          try {
               logger.info(`services - databaseService - connect - `);
               await mongoose.connect(`mongodb://${this.config.host}:${this.config.port}/${this.config.dbName}`, {
                    //   useNewUrlParser: true,
                    //   useUnifiedTopology: true,
               });
               logger.info(`services - databaseService - connect - db connected`);
          } catch (err) {
               logger.info(`services - databaseService - connect - exception - ${err}`);
               logger.error(`services - databaseService - connect - exception - ${err}`);
          }
     }
}
