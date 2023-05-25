"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const http_response_type_adapter_factory_1 = require("../../commons/http-response/http-response-type-adapter-factory");
const send_azure_document_1 = __importDefault(require("./interface/controller/send-azure-document"));
const template_response_insert_document_1 = __importDefault(require("./interface/view/template-response-insert-document"));
const httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
const filePath = process.env.LOCAL_DOCS || '';
const createTemplateResponse = new template_response_insert_document_1.default();
const handler = async () => {
    try {
        const docsTxt = await new send_azure_document_1.default().sendAzureDocument(filePath);
        const modelsResponse = await createTemplateResponse.templateReponseInsertDocument(docsTxt);
        const stringifyData = JSON.stringify(modelsResponse);
        return httpResponse.successResponse().getResponse(stringifyData);
    }
    catch (error) {
        const { message } = error;
        return httpResponse.internalServerErrorResponse().getResponse(message);
    }
    ;
};
exports.handler = handler;
