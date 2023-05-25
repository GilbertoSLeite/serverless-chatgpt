"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
class TemplateResponseInsertDocument {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async templateReponseInsertDocument(response) {
        // Cálculo da quantidade de "succeeded" igual a true
        const succeededCount = response.results.filter(result => result.succeeded === true).length;
        // Cálculo da quantidade de "errorMessage" diferente de null
        const errorCount = response.results.filter(result => result.errorMessage !== null).length;
        // Montagem do objeto com as três propriedades
        const resultObject = {
            enviadosSucesso: succeededCount,
            enviadosErro: errorCount,
        };
        // Verificação se há errorMessage diferente de null e adição da propriedade erroOcorrido
        const hasError = response.results.some(result => result.errorMessage !== null);
        if (hasError) {
            const errorResult = response.results.find(result => result.errorMessage !== null);
            if (errorResult) {
                resultObject.erroOcorrido = errorResult.errorMessage;
            }
        }
        return resultObject;
    }
}
exports.default = TemplateResponseInsertDocument;
