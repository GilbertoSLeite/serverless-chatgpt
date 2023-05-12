"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const rephrased_question_prompt_1 = __importDefault(require("../../domain/entities/rephrased-question-prompt"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const create_conversation_openai_1 = __importDefault(require("./create-conversation-openai"));
class InteractionContinuesConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.promptPrefix = new rephrased_question_prompt_1.default();
        this.conversationOpenai = new configuration_openai_1.default();
        this.askingAgainRephrased = new create_conversation_openai_1.default();
    }
    async interactionContinuesConversationOpenai(conversation, context) {
        try {
            const lastConversation = conversation.pop();
            const regex = /\?$/;
            const isQuestion = regex.test(lastConversation);
            if (isQuestion) {
                const finallyResponseOpenai = await this.askingAgainRephrased.createConversationOpenai(lastConversation, context);
                return finallyResponseOpenai;
            }
            ;
            const conversationToString = conversation.join(' , ');
            const rephrasedText = this.promptPrefix.rephrasedQuestionPrompt(conversationToString, lastConversation);
            const responseOpenai = await this.conversationOpenai.configureOpenia(rephrasedText);
            const responseOpenaiToString = responseOpenai.toString();
            const finallyResponseOpenai = await this.askingAgainRephrased.createConversationOpenai(responseOpenaiToString, context);
            return finallyResponseOpenai;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = InteractionContinuesConversationOpenai;
