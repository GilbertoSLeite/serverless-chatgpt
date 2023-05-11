"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const apiKey = process.env.OPENAI_API_KEY;
const basePath = process.env.BASE_PATH;
const apiVersion = process.env.API_VERSION;
class ConfigurationOpenai {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async configureOpenia(promptPrefix) {
        try {
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
            const completion = await openai.createCompletion({
                model: 'gpt-35-turbo',
                prompt: promptPrefix,
                temperature: 0,
                max_tokens: 350,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                stop: ["\"\"\""],
            });
            const regex = /<\|im_end\|>/g;
            return completion.data.choices.map(choicesText => choicesText.text).join(' ').replace(regex, "");
            ;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = ConfigurationOpenai;
;
