"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const on_finished_1 = __importDefault(require("on-finished"));
const logger = (req, res, next) => {
    const start = Date.now();
    const { method, originalUrl: url } = req;
    let methodStyle;
    switch (method) {
        case "GET":
            methodStyle = chalk_1.default.green.bold(method);
            break;
        case "POST":
            chalk_1.default.blue.bold(method);
            break;
        case "DELETE":
            chalk_1.default.redBright.bold(method);
            break;
        case "PUT":
            chalk_1.default.yellow.bold(method);
            break;
        default:
            chalk_1.default.yellow.grey(method);
    }
    (0, on_finished_1.default)(res, (error, response) => {
        const time = Date.now() - start;
        const { statusCode } = response;
        console.log(methodStyle);
    });
    next();
};
exports.default = logger;
