"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const consult_context_cognitive_search_1 = require("./consult-context-cognitive-search");
class StartConversationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.searchConsultConversation = new consult_context_cognitive_search_1.CognitiveSearch();
    }
    async startingConversationOpenai(conversation, context) {
        try {
            console.log(`conversation em startingConversationOpenai: ${JSON.stringify(conversation, null, 2)}`);
            const resultContextConversation = await this.searchConsultConversation.getContexts(conversation, context);
            return resultContextConversation;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = StartConversationOpenai;
