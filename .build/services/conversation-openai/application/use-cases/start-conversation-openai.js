"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const prompt_prefix_1 = __importDefault(require("../../domain/entities/prompt_prefix"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const consult_context_cognitive_search_1 = require("./consult-context-cognitive-search");
class StartConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.searchConsultConversation = new consult_context_cognitive_search_1.CognitiveSearch();
        this.promptPrefix = new prompt_prefix_1.default();
        this.conversationOpenai = new configuration_openai_1.default();
    }
    async startingConversationOpenai(conversation, context) {
        try {
            const resultContextConversation = await this.searchConsultConversation.getContexts(conversation, context);
            const getOnlyContent = resultContextConversation.map(contentData => contentData.content).join(',');
            const createFirstConversationPrompt = this.promptPrefix.promptPrefix(getOnlyContent, conversation.join(','));
            const responseOpenai = this.conversationOpenai.configureOpenia(createFirstConversationPrompt);
            console.log(`responseOpenai: ${JSON.stringify(responseOpenai, null, 2)}`);
            return responseOpenai;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = StartConversationOpenai;
