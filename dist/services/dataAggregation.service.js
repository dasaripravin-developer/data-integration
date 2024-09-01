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
exports.DataAggregationService = void 0;
const cases_model_1 = require("../models/cases.model");
const logger_1 = require("../utils/logger");
class DataAggregationService {
    getCasesByCity(city, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`services - dataAggregationService - getCasesByCity - city - ${city}  - startdate - ${startDate} - enddate - ${endDate}`);
                const query = { city };
                if (startDate) {
                    query.createdAt = { $gte: startDate };
                }
                if (endDate) {
                    query.createdAt ? (query.createdAt["$lte"] = endDate) : (query.createdAt = { $lte: endDate });
                }
                logger_1.logger.info(`services - dataAggregationService - getCasesByCity - query - ${JSON.stringify(query)}`);
                const cases = (yield cases_model_1.CasesModel.find(query)).length;
                logger_1.logger.info(`services - dataAggregationService - getCasesByCity - response - ${cases}`);
                return cases;
            }
            catch (err) {
                logger_1.logger.info(`services - dataAggregationService - getCasesByCity - Exception - ${err}`);
                logger_1.logger.error(`services - dataAggregationService - getCasesByCity - Exception - ${err}`);
            }
        });
    }
    getCityWiseCases() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`services - dataAggregationService - getCityWiseCases -`);
                const result = yield cases_model_1.CasesModel.aggregate([
                    {
                        $group: {
                            _id: "$city",
                            count: { $sum: 1 },
                        },
                    },
                ]);
                logger_1.logger.info(`services - dataAggregationService - getCityWiseCases - result - ${JSON.stringify(result)}`);
                return result;
            }
            catch (err) {
                logger_1.logger.info(`services - dataAggregationService - getCityWiseCases - Exception - ${err}`);
                logger_1.logger.error(`services - dataAggregationService - getCityWiseCases - Exception - ${err}`);
            }
        });
    }
}
exports.DataAggregationService = DataAggregationService;
