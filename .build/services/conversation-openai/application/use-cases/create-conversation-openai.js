"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const logger_entry_interface_1 = require("../../../../commons/structure-logger/logger-entry-interface");
const info_logger_1 = require("../../../../commons/structure-logger/logger/info-logger");
const create_answer_prompt_1 = __importDefault(require("../../domain/entities/create-answer-prompt"));
const rephrased_question_prompt_1 = __importDefault(require("../../domain/entities/rephrased-question-prompt"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const consult_context_cognitive_search_1 = require("./consult-context-cognitive-search");
const logger = new info_logger_1.InfoLogger(logger_entry_interface_1.loggerDependencies);
class StartConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.searchConsultConversation = new consult_context_cognitive_search_1.CognitiveSearch();
        this.promptPrefix = new create_answer_prompt_1.default();
        this.conversationOpenai = new configuration_openai_1.default();
        this.rephrasedQuestionPrompt = new rephrased_question_prompt_1.default();
    }
    async createConversationOpenai(conversation, ultimaFrase, openai, context) {
        try {
            const regex = /\?$/;
            const isQuestion = regex.test(ultimaFrase);
            if (!isQuestion)
                ultimaFrase = (ultimaFrase += "?");
            const convertedConversationToString = conversation.toString();
            logger.infoLogger('create-conversation-openai.ts', 'Contexto da Conversa para Refraseamento', 'chatGPT', { contextoRefraseamento: convertedConversationToString });
            console.time('rephrasedQuestionPrompt');
            const rephrasedPrompt = await this.rephrasedQuestionPrompt.rephrasedQuestionPrompt(ultimaFrase, convertedConversationToString);
            console.timeEnd('rephrasedQuestionPrompt');
            console.time('configureOpenia');
            const responseRephrasedOpenai = await this.conversationOpenai.configureOpenia(rephrasedPrompt, openai, context);
            console.timeEnd('configureOpenia');
            logger.infoLogger('create-conversation-openai.ts', 'Construção das Conversas com ChatGPT', 'chatGPT', { fraseRefraseada: responseRephrasedOpenai });
            console.time('searchConsultConversation');
            const resultContextConversation = await this.searchConsultConversation.sendContext(responseRephrasedOpenai, context);
            console.timeEnd('searchConsultConversation');
            const getOnlyContent = resultContextConversation.map(contentData => contentData.content).join(' ');
            logger.infoLogger('create-conversation-openai.ts', 'Contexto do Cognitive Search', 'chatGPT', { contextoCognitiveSearch: getOnlyContent });
            console.time('createAnswerPrompt');
            const createFirstConversationPrompt = await this.promptPrefix.createAnswerPrompt(getOnlyContent, responseRephrasedOpenai);
            console.timeEnd('createAnswerPrompt');
            console.time('configureOpeniaResponseOpenai');
            const responseOpenai = await this.conversationOpenai.configureOpenia(createFirstConversationPrompt, openai, context);
            console.timeEnd('configureOpeniaResponseOpenai');
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
