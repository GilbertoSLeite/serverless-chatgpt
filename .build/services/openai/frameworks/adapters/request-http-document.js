"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_request_1 = require("../../../../commons/api-request/api-request");
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const url = process.env.HTTP_DOCS || '';
class RequestHTTPDocument {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.apiRequest = new api_request_1.ApiRequestService();
    }
    async requestHttpDocument() {
        try {
            const config = {
                url,
                method: 'GET',
            };
            const docsPdf = this.apiRequest.apiRequest(config);
            return docsPdf;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = RequestHTTPDocument;
