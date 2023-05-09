"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkResponse = void 0;
const logger_entry_interface_1 = require("../../structure-logger/logger-entry-interface");
const info_logger_1 = require("../../structure-logger/logger/info-logger");
const http_response_1 = __importDefault(require("../http-response"));
const infoLog = new info_logger_1.InfoLogger(logger_entry_interface_1.loggerDependencies);
class OkResponse {
    getResponse(message) {
        this.statusCode = 200;
        this.body = message;
        const responseBadRequest = new http_response_1.default(this.statusCode, this.body);
        infoLog.infoLogger('http-response-type.ts', 'Retorno da Requisição com Sucesso', 'Resposta HTTP', { statuCode: 200, body: message });
        return responseBadRequest;
    }
}
exports.OkResponse = OkResponse;
