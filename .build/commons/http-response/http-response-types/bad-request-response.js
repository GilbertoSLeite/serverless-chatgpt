"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestResponse = void 0;
const logger_entry_interface_1 = require("../../structure-logger/logger-entry-interface");
const error_logger_1 = require("../../structure-logger/logger/error-logger");
const http_response_1 = __importDefault(require("../http-response"));
const errorLog = new error_logger_1.ErrorLogger(logger_entry_interface_1.loggerDependencies);
class BadRequestResponse extends Error {
    getResponse(message) {
        this.statusCode = 400;
        this.body = message;
        const responseBadRequest = new http_response_1.default(this.statusCode, this.body);
        errorLog.errorLogger('http-response-type.ts', 'Requisição com Erro Bad Request', 'Resposta HTTP', { statuCode: 400, body: message });
        return responseBadRequest;
    }
}
exports.BadRequestResponse = BadRequestResponse;
