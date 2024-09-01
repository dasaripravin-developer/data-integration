import { CronJob } from "cron";
import { DataImportService } from "./dataImport.service";
import { logger } from "../utils/logger";
export class JobScheduler {
     private dataImportService: DataImportService;
     private jobs: any[];
     constructor() {
          this.jobs = [];
          this.dataImportService = new DataImportService();
          logger.info(`services - jobShedulerService - JobScheduler - data import service instance created `);
     }

     async dataImportJob() {
          try {
               logger.info("service - jobShedulerService - jobScheduler - dataImportJob ");
               const job = new CronJob(
                    "0 10,17 * * *",
                    () => {
                         this.dataImportService.importData("https://docs.google.com/spreadsheets/d/1fKIERYlgngywgJnv0cpiNbktkXeAUVCG0W0yWVcV-S4");
                    },
                    null,
                    false,
                    "Asia/Kolkata"
               );
               logger.info("service - jobShedulerService - jobScheduler - dataImportJob - job scheduler created");
               this.jobs.push(job);
          } catch (err) {
               logger.error(`service - jobShedulerService - jobScheduler - dataImportJob - exception - ${err}`);
          }
     }

     async start() {
          this.jobs.forEach((job) => job.start());
          logger.info("service - jobShedulerService - jobScheduler - start - job scheduler started");
     }
}
