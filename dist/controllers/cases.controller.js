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
exports.CasesController = void 0;
const dataAggregation_service_1 = require("../services/dataAggregation.service");
const logger_1 = require("../utils/logger");
class CasesController {
    constructor() {
        logger_1.logger.info(`controllers - cases.controller -  data aggregation service object created`);
    }
    getCasesByCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`controllers - cases.controller - getCasesByCity - ${JSON.stringify(req.query)}`);
                const { city, startDate, endDate } = req.query;
                console.log("this this = >", this);
                const cases = yield new dataAggregation_service_1.DataAggregationService().getCasesByCity(city, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
                logger_1.logger.info(`controllers - cases.controller - getCasesByCity - response - ${cases}`);
                res.json({ cases });
            }
            catch (error) {
                logger_1.logger.info(`controllers - cases.controller - getCasesByCity - Exception - ${error}`);
                logger_1.logger.error(`controllers - cases.controller - getCasesByCity - Exception - ${error}`);
                res.status(500).json({ error: "Failed to retrieve cases" });
            }
        });
    }
    getCityWiseCases(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`controllers - cases.controller - getCityWiseCases - `);
                const res = yield new dataAggregation_service_1.DataAggregationService().getCityWiseCases();
                logger_1.logger.info(`controllers - cases.controller - getCityWiseCases - response - ${res}`);
                response.json(res);
            }
            catch (err) {
                logger_1.logger.info(`controllers - cases.controller - getCityWiseCases - exception - ${err}`);
                logger_1.logger.error(`controllers - cases.controller - getCityWiseCases - exception - ${err}`);
                response.status(500).json({ error: "Failed to get city wise cases" });
            }
        });
    }
}
exports.CasesController = CasesController;
