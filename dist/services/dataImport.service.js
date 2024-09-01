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
exports.DataImportService = void 0;
const cases_model_1 = require("../models/cases.model");
const googleSheetReader_1 = require("../utils/googleSheetReader");
const logger_1 = require("../utils/logger");
class DataImportService {
    constructor() {
        this.googleSheetReader = new googleSheetReader_1.GoogleSheetReader();
    }
    importData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`services - dataImportService - importData - url - ${url}`);
                const sheetData = yield this.googleSheetReader.readInChunk(url);
                logger_1.logger.info(`services - dataImportService - importData - url - ${url} - data lenght - ${sheetData.lenght}`);
                const cases = sheetData.map((row) => ({
                    bankName: row.bankName,
                    propertyName: row.propertyName,
                    city: row.city,
                    borrowerName: row.borrowerName,
                    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
                }));
                yield cases_model_1.CasesModel.insertMany(cases);
                logger_1.logger.info(`services - dataImportService - importData - url - ${url} - ${sheetData.lenght} recored inserted successfully`);
            }
            catch (error) {
                logger_1.logger.info(`services - dataImportService - importData - url - ${url} - Exception - ${error}`);
                logger_1.logger.error(`services - dataImportService - importData - url - ${url} - Exception - ${error}`);
            }
        });
    }
}
exports.DataImportService = DataImportService;
