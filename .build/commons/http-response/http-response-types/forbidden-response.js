"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenResponse = void 0;
const logger_entry_interface_1 = require("../../structure-logger/logger-entry-interface");
const warning_logger_1 = require("../../structure-logger/logger/warning-logger");
const http_response_1 = __importDefault(require("../http-response"));
const warningLog = new warning_logger_1.WarningLogger(logger_entry_interface_1.loggerDependencies);
class ForbiddenResponse extends Error {
    getResponse(message) {
        this.statusCode = 403;
        this.body = message;
        const responseForbidden = new http_response_1.default(this.statusCode, this.body);
        warningLog.warningLogger('http-response-type.ts', 'Requisição Não Permitida Forbidden', 'Resposta HTTP', { statuCode: 403, body: message });
        return responseForbidden;
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
