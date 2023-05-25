"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const create_conversation_openai_1 = __importDefault(require("../../application/use-cases/create-conversation-openai"));
class IdentifyLastTalk {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.triggerConversation = new create_conversation_openai_1.default();
    }
    async identifyLastTalk(similarConversation, ultimaFrase, context) {
        try {
            const regex = /[\\"]/g;
            const cleanSimilarConversation = similarConversation.replace(regex, '');
            const response = await this.triggerConversation.createConversationOpenai(cleanSimilarConversation, ultimaFrase, context);
            return response;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = IdentifyLastTalk;
