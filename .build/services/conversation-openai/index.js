"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const http_response_type_adapter_factory_1 = require("../../commons/http-response/http-response-type-adapter-factory");
const analyzing_subject_similarity_1 = __importDefault(require("./interface/controller/analyzing-subject-similarity"));
const identify_last_talk_1 = __importDefault(require("./interface/controller/identify-last-talk"));
const httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
const searchByConversations = new identify_last_talk_1.default();
const similarity = new analyzing_subject_similarity_1.default();
const handler = async (event, context) => {
    try {
        const { body } = event;
        const bodyParsed = JSON.parse(body);
        const { conversation } = bodyParsed;
        const lastPhrase = conversation[conversation.length - 1];
        const similarConversation = await similarity.findConvergentSubjects(conversation, lastPhrase);
        console.log(`Similaridade: ${similarConversation}`);
        const response = await searchByConversations.identifyLastTalk(similarConversation, lastPhrase, context);
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
