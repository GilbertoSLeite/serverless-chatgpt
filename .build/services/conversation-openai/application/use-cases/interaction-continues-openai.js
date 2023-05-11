"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const other_interaction_prompt_1 = __importDefault(require("../../domain/entities/other-interaction-prompt"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const consult_context_cognitive_search_1 = require("./consult-context-cognitive-search");
class InteractionContinuesConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.searchConsultConversation = new consult_context_cognitive_search_1.CognitiveSearch();
        this.promptPrefix = new other_interaction_prompt_1.default();
        this.conversationOpenai = new configuration_openai_1.default();
    }
    async interactionContinuesConversationOpenai(conversation, context) {
        try {
            const resultContextConversation = await this.searchConsultConversation.getContexts(conversation, context);
            const getOnlyContent = resultContextConversation.map(contentData => contentData.content).join(',');
            const lastConversation = conversation[conversation.length - 1];
            const createFirstConversationPrompt = this.promptPrefix.promptPrefix(getOnlyContent, conversation.join(','), lastConversation);
            const responseOpenai = this.conversationOpenai.configureOpenia(createFirstConversationPrompt);
            return responseOpenai;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = InteractionContinuesConversationOpenai;
