"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
class IdentifyLastTalk {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async identifyLastTalk(queryStringParameters, context) {
        try {
            const sizeConversation = queryStringParameters.conversation.length || 0;
            if (sizeConversation === 1) { }
            if (sizeConversation > 1) { }
            const responseNotFound = this.httpResponse.notFoundResponse().getResponse('No conversation has been sent');
            return context.succeed(responseNotFound);
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = IdentifyLastTalk;
