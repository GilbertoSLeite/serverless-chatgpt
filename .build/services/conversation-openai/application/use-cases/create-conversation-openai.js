"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const create_answer_prompt_1 = __importDefault(require("../../domain/entities/create-answer-prompt"));
const rephrased_question_prompt_1 = __importDefault(require("../../domain/entities/rephrased-question-prompt"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const consult_context_cognitive_search_1 = require("./consult-context-cognitive-search");
class StartConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.searchConsultConversation = new consult_context_cognitive_search_1.CognitiveSearch();
        this.promptPrefix = new create_answer_prompt_1.default();
        this.conversationOpenai = new configuration_openai_1.default();
        this.rephrasedQuestionPrompt = new rephrased_question_prompt_1.default();
    }
    async createConversationOpenai(conversation, ultimaFrase, context) {
        try {
            const regex = /\?$/;
            const isQuestion = regex.test(ultimaFrase);
            if (!isQuestion)
                ultimaFrase = (ultimaFrase += "?");
            const convertedConversationToString = conversation.toString();
            console.log(`Última pergunta feita: ${ultimaFrase}`);
            console.log(`Contexto da conversa: ${convertedConversationToString}`);
            const rephrasedPrompt = this.rephrasedQuestionPrompt.rephrasedQuestionPrompt(ultimaFrase, convertedConversationToString);
            const responseRephrasedOpenai = await this.conversationOpenai.configureOpenia(rephrasedPrompt, context);
            console.log(`Contexto Refraseado: ${responseRephrasedOpenai}`);
            const resultContextConversation = await this.searchConsultConversation.sendContext(responseRephrasedOpenai, context);
            const getOnlyContent = resultContextConversation.map(contentData => contentData.content).join(' ');
            console.log(`Contexto das Conversas: ${getOnlyContent}`);
            const createFirstConversationPrompt = this.promptPrefix.createAnswerPrompt(getOnlyContent, responseRephrasedOpenai);
            const responseOpenai = await this.conversationOpenai.configureOpenia(createFirstConversationPrompt, context);
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
