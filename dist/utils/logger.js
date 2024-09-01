"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const myFormat = winston_1.default.format.printf((info) => {
    let data;
    if (typeof info.message == "object") {
        data = JSON.stringify(info.message, null, 1);
    }
    else {
        data = info.message;
    }
    return `${info.timestamp} - ${info.level} -${data}`;
});
const logger = winston_1.default.createLogger({
    exitOnError: false,
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), myFormat),
    transports: [
        new winston_1.default.transports.Console({
        //  format: winston.format.simple(),
        }),
        new winston_1.default.transports.File({ filename: "./logs/error.log", level: "error", maxsize: 1024 * 1024 * 10 }),
        new winston_1.default.transports.File({ filename: "./logs/info.log", level: "info", maxsize: 1024 * 1024 * 10 }),
    ],
});
exports.logger = logger;
