"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const logger_entry_interface_1 = require("../../../../commons/structure-logger/logger-entry-interface");
const info_logger_1 = require("../../../../commons/structure-logger/logger/info-logger");
const search_documents_1 = require("@azure/search-documents");
const informationLog = new info_logger_1.InfoLogger(logger_entry_interface_1.loggerDependencies);
const SEARCH_ENDPOINT = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY = process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME = process.env.SEARCH_INDEX_NAME || '';
// Create Search service client
// used to upload docs into Index
const client = new search_documents_1.SearchClient(SEARCH_ENDPOINT, SEARCH_INDEX_NAME, new search_documents_1.AzureKeyCredential(SEARCH_KEY));
class UploadIndexCognitiveSearch {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async uploadDocuments(batchArray) {
        try {
            const statusUploadDocuments = await client.uploadDocuments(batchArray);
            informationLog.infoLogger('upload-index-cognitive-search.ts', 'Envio Documento para Cognitive Search', 'Cognitive Search', { sentData: statusUploadDocuments });
            return statusUploadDocuments;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = UploadIndexCognitiveSearch;
