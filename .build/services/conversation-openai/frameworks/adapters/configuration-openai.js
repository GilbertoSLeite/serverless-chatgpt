"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
class ConfigurationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async configureOpenia(promptPrefix, openai, context) {
        try {
            const completion = await openai.createCompletion({
                model: 'gpt-35-turbo',
                prompt: promptPrefix,
                temperature: 0,
                max_tokens: 350,
                top_p: 0.5,
                frequency_penalty: 0.8,
                presence_penalty: 1,
                stop: ["\"\"\""],
            });
            if (completion.data && completion.data.choices) {
                const regex = /<\|im_end\|>/g;
                return completion.data.choices.map((choicesText) => choicesText.text).join(' ').replace(regex, "");
            }
            else {
                const errorResponse = this.httpResponse.badRequestResponse().getResponse("Unexpected response format from OpenAI API.");
                return context.succeed(errorResponse);
            }
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.default = ConfigurationOpenai;
;
