"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobScheduler = void 0;
const cron_1 = require("cron");
const dataImport_service_1 = require("./dataImport.service");
const logger_1 = require("../utils/logger");
class JobScheduler {
    constructor() {
        this.jobs = [];
        this.dataImportService = new dataImport_service_1.DataImportService();
        logger_1.logger.info(`services - jobShedulerService - JobScheduler - data import service instance created `);
    }
    dataImportJob() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info("service - jobShedulerService - jobScheduler - dataImportJob ");
                const job = new cron_1.CronJob("0 10,17 * * *", () => {
                    this.dataImportService.importData("https://docs.google.com/spreadsheets/d/1fKIERYlgngywgJnv0cpiNbktkXeAUVCG0W0yWVcV-S4");
                }, null, false, "Asia/Kolkata");
                logger_1.logger.info("service - jobShedulerService - jobScheduler - dataImportJob - job scheduler created");
                this.jobs.push(job);
            }
            catch (err) {
                logger_1.logger.error(`service - jobShedulerService - jobScheduler - dataImportJob - exception - ${err}`);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.jobs.forEach((job) => job.start());
            logger_1.logger.info("service - jobShedulerService - jobScheduler - start - job scheduler started");
        });
    }
}
exports.JobScheduler = JobScheduler;
