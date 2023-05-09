"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundResponse = void 0;
const logger_entry_interface_1 = require("../../structure-logger/logger-entry-interface");
const error_logger_1 = require("../../structure-logger/logger/error-logger");
const http_response_1 = __importDefault(require("../http-response"));
const errorLog = new error_logger_1.ErrorLogger(logger_entry_interface_1.loggerDependencies);
class NotFoundResponse extends Error {
    getResponse(message) {
        this.statusCode = 404;
        this.body = message;
        const responseNotFound = new http_response_1.default(this.statusCode, this.body);
        errorLog.errorLogger('http-response-type.ts', 'Requisição com Erro Not Found', 'Resposta HTTP', { statuCode: 404, body: message });
        return responseNotFound;
    }
}
exports.NotFoundResponse = NotFoundResponse;
