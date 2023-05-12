"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const interaction_continues_openai_1 = __importDefault(require("../../application/use-cases/interaction-continues-openai"));
const create_conversation_openai_1 = __importDefault(require("../../application/use-cases/create-conversation-openai"));
class IdentifyLastTalk {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.triggerConversation = new create_conversation_openai_1.default();
        this.triggerOtherConversation = new interaction_continues_openai_1.default();
    }
    async identifyLastTalk(body, context) {
        try {
            const bodyParsed = JSON.parse(body);
            const { conversation } = bodyParsed;
            const arrayConversation = JSON.stringify(conversation).split(". ");
            const sizeConversation = arrayConversation.length || 0;
            if (sizeConversation === 1)
                return await this.triggerConversation.createConversationOpenai(conversation, context);
            if (sizeConversation > 1)
                return await this.triggerOtherConversation.interactionContinuesConversationOpenai(conversation, context);
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
