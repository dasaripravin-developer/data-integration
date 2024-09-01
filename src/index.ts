import { CasesRoutes } from "./routes/cases.route";
import express from "express";
import { Database } from "./services/database.service";
import { JobScheduler } from "./services/jobScheduler.service";
import { logger } from "./utils/logger";
import "dotenv/config";

(async () => {
     const app = express();
     const database = new Database({
          host: process.env.MONGODB_HOST,
          port: process.env.MONGODB_PORT,
          dbName: process.env.DB_NAME,
     });
     await database.connect();
     const jobScheduler = new JobScheduler();
     await jobScheduler.dataImportJob();
     await jobScheduler.start();
     const casesRoutes = new CasesRoutes();
     casesRoutes.registerRoutes(app);
     app.listen(process.env.PORT || 3000, () => {
          console.log("Server listening on port 3000");
          logger.info(`index - server running on 3000 port`);
     });
})();

process.on("uncaughtException", (err) => {
     console.log("uncaught Exception - ", err);
     logger.error(`uncaught Exception - ${err.message}`);
});
