"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_response_type_adapter_factory_1 = require("../http-response/http-response-type-adapter-factory");
class ApiRequestService {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async apiRequest(config) {
        try {
            const { method, headers, params, url } = config;
            const axiosConfig = {
                url,
                method,
                headers,
                params
            };
            const response = await (0, axios_1.default)(axiosConfig);
            const buffer = Buffer.from(response.data);
            return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        }
        catch (error) {
            const { message } = error;
            const statusRespose = {
                400: (errorMessage) => this.httpResponse.badRequestResponse().getResponse(errorMessage),
                404: (errorMessage) => this.httpResponse.notFoundResponse().getResponse(errorMessage),
            };
            const errorResponse = (error.response ? statusRespose[error.response.status](error.response.statusText) : this.httpResponse.internalServerErrorResponse().getResponse(message));
            return errorResponse;
        }
    }
}
exports.ApiRequestService = ApiRequestService;
