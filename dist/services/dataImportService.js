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
const caseModel_1 = require("../models/caseModel");
const csvParser_1 = require("../utils/csvParser");
const logger_1 = require("../utils/logger");
class DataImportService {
    importDataFromGoogleDocs(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const csvData = yield csvParser_1.csvParser.parseFromGoogleDocs(url);
                const cases = csvData.map((row) => ({
                    bankName: row.bankName,
                    propertyName: row.propertyName,
                    city: row.city,
                    borrowerName: row.borrowerName,
                }));
                yield caseModel_1.CaseModel.insertMany(cases);
                logger_1.logger.info('Data import completed successfully.');
            }
            catch (error) {
                logger_1.logger.error('Error during data import:', error);
            }
        });
    }
}
exports.DataImportService = DataImportService;
