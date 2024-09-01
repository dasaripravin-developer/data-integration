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
exports.GoogleSheetReader = void 0;
const googleapis_1 = require("googleapis");
const credential_json_1 = __importDefault(require("../../credential/credential.json"));
const logger_1 = require("../utils/logger");
class GoogleSheetReader {
    constructor() {
        this.chunkSize = 5;
        this.scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        this.auth = new googleapis_1.google.auth.GoogleAuth({
            scopes: this.scopes,
            credentials: credential_json_1.default,
        });
    }
    readInChunk(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            try {
                const resultArr = [];
                const sheets = googleapis_1.google.sheets({ version: "v4", auth: this.auth });
                const readChunk = (start, end) => __awaiter(this, void 0, void 0, function* () {
                    logger_1.logger.info(`utils - googleSheetReader - readInChunk - readChunk - start - ${start} - end - ${end}`);
                    const response = yield sheets.spreadsheets.values.get({
                        spreadsheetId: url.split("/d/")[1],
                        range: `Sheet1!${start}:${end}`,
                    });
                    return response.data.values || [];
                });
                const formatData = (rows, headers) => __awaiter(this, void 0, void 0, function* () {
                    return rows.map((row) => {
                        const obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index];
                        });
                        return obj;
                    });
                });
                let headers = [];
                while (true) {
                    let rows = yield readChunk(this.chunkSize * i + 1, this.chunkSize * (i + 1));
                    if (rows.length <= 1 && i === 0) {
                        logger_1.logger.info(`utils - googleSheetReader - readInChunk - file is empty - url - ${url}`);
                        logger_1.logger.error(`utils - googleSheetReader - readInChunk - file is empty - url - ${url}`);
                        break;
                    }
                    if (i == 0) {
                        headers = rows[0];
                        rows = rows.splice(1);
                    }
                    logger_1.logger.info(`utils - googleSheetReader - readInChunk - batch - ${i + 1} - data lenght - ${rows.length}`);
                    resultArr.push(...(yield formatData(rows, headers)));
                    if ((rows.length < this.chunkSize - 1 && i == 0) || (rows.length < this.chunkSize && i != 0))
                        break;
                    i++;
                }
                return resultArr;
            }
            catch (err) {
                logger_1.logger.info(`utils - googleSheetReader - readInChunk - Exception - while reading data - batch - ${i + 1} - Error - ${err}`);
                logger_1.logger.error(`utils - googleSheetReader - readInChunk - Exception - while reading data - batch - ${i + 1} - Error - ${err}`);
            }
        });
    }
}
exports.GoogleSheetReader = GoogleSheetReader;
