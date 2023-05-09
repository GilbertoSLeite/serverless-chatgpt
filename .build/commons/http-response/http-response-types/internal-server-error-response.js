"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorResponse = void 0;
const logger_entry_interface_1 = require("../../structure-logger/logger-entry-interface");
const critical_logger_1 = require("../../structure-logger/logger/critical-logger");
const http_response_1 = __importDefault(require("../http-response"));
const criticalLog = new critical_logger_1.ErrorCriticalLogger(logger_entry_interface_1.loggerDependencies);
class InternalServerErrorResponse extends Error {
    getResponse(message) {
        this.statusCode = 500;
        this.body = message;
        const responseInternalServerError = new http_response_1.default(this.statusCode, this.body);
        criticalLog.errorCriticalLogger('http-response-type.ts', 'Requisição com Erro Internal Server Error', 'Resposta HTTP', { statuCode: 500, body: message });
        return responseInternalServerError;
    }
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
