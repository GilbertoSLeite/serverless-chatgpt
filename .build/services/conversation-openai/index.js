"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const openai_1 = require("openai");
const http_response_type_adapter_factory_1 = require("../../commons/http-response/http-response-type-adapter-factory");
const logger_entry_interface_1 = require("../../commons/structure-logger/logger-entry-interface");
const info_logger_1 = require("../../commons/structure-logger/logger/info-logger");
const subject_analyzer_1 = __importDefault(require("./interface/controller/analyzing-subject-similarity/subject-analyzer"));
const conversatio_creation_wrapper_1 = __importDefault(require("./interface/controller/conversation-creation-openai/conversatio-creation-wrapper"));
const httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
const searchByConversations = new conversatio_creation_wrapper_1.default();
const similarity = new subject_analyzer_1.default();
const logger = new info_logger_1.InfoLogger(logger_entry_interface_1.loggerDependencies);
const apiKey = process.env.OPENAI_API_KEY;
const basePath = process.env.BASE_PATH;
const apiVersion = process.env.API_VERSION;
const configuration = new openai_1.Configuration({
    apiKey,
    basePath,
    baseOptions: {
        headers: {
            'api-key': apiKey
        },
        params: {
            'api-version': apiVersion // this might change. I got the current value from the sample code at https://oai.azure.com/portal/chat
        }
    }
});
const openai = new openai_1.OpenAIApi(configuration);
const handler = async (event, context) => {
    try {
        const { body } = event;
        const bodyParsed = JSON.parse(body);
        const { conversation } = bodyParsed;
        logger.infoLogger('index.ts', 'Conversas Recebidas', 'chatGPT', { conversas: JSON.stringify(conversation, null, 2) });
        const lastPhrase = conversation[conversation.length - 1];
        logger.infoLogger('index.ts', 'Última Pergunta Recebidas', 'chatGPT', { ultimaPergunta: lastPhrase });
        const similarConversation = await similarity.findConvergentSubjects(conversation, lastPhrase, context);
        logger.infoLogger('index.ts', 'Vetor de Similaridade', 'chatGPT', { similaridadePalavras: similarConversation });
        const response = await searchByConversations.createConversation(similarConversation, lastPhrase, openai, context);
        const cleanResponse = response.replace(/\n/g, '');
        return httpResponse.successResponse().getResponse(JSON.stringify(cleanResponse));
    }
    catch (error) {
        const { message } = error;
        return httpResponse.internalServerErrorResponse().getResponse(message);
    }
    ;
};
exports.handler = handler;
