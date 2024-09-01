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
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
class Database {
    constructor(config) {
        this.config = config !== null && config !== void 0 ? config : { host: "0.0.0.0", port: 27017, dbName: "db" };
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`services - databaseService - connect - `);
                yield mongoose_1.default.connect(`mongodb://${this.config.host}:${this.config.port}/${this.config.dbName}`, {
                //   useNewUrlParser: true,
                //   useUnifiedTopology: true,
                });
                logger_1.logger.info(`services - databaseService - connect - db connected`);
            }
            catch (err) {
                logger_1.logger.info(`services - databaseService - connect - exception - ${err}`);
                logger_1.logger.error(`services - databaseService - connect - exception - ${err}`);
            }
        });
    }
}
exports.Database = Database;
