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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cases_route_1 = require("./routes/cases.route");
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const jobScheduler_service_1 = require("./services/jobScheduler.service");
const logger_1 = require("./utils/logger");
require("dotenv/config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const database = new database_service_1.Database({
        host: process.env.MONGODB_HOST,
        port: process.env.MONGODB_PORT,
        dbName: process.env.DB_NAME,
    });
    yield database.connect();
    const jobScheduler = new jobScheduler_service_1.JobScheduler();
    yield jobScheduler.dataImportJob();
    yield jobScheduler.start();
    const casesRoutes = new cases_route_1.CasesRoutes();
    casesRoutes.registerRoutes(app);
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server listening on port 3000");
        logger_1.logger.info(`index - server running on 3000 port`);
    });
}))();
process.on("uncaughtException", (err) => {
    console.log("uncaught Exception - ", err);
    logger_1.logger.error(`uncaught Exception - ${err.message}`);
});
