"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const indexer_1 = require("../../../../commons/indexer/indexer");
const logger_entry_interface_1 = require("../../../../commons/structure-logger/logger-entry-interface");
const info_logger_1 = require("../../../../commons/structure-logger/logger/info-logger");
const search_documents_1 = require("@azure/search-documents");
const informationLog = new info_logger_1.InfoLogger(logger_entry_interface_1.loggerDependencies);
const SEARCH_ENDPOINT = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY = process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME = process.env.SEARCH_INDEX_NAME || '';
const client = new search_documents_1.SearchIndexClient(SEARCH_ENDPOINT, new search_documents_1.AzureKeyCredential(SEARCH_KEY));
class ExistIndexOrCreateIndex {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async existIndexOrCreateIndex() {
        try {
            await client.getIndex(SEARCH_INDEX_NAME);
            return true;
        }
        catch (error) {
            try {
                const indexCreate = await client.createIndex(indexer_1.index);
                informationLog.infoLogger('exist-index-or-create-index.ts', 'Index cirado para Cognitive Search', 'Cognitive Search', { index: indexCreate });
                return true;
            }
            catch (error) {
                const { message } = error;
                const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
                return {
                    status: false,
                    errorResponse
                };
            }
        }
    }
}
exports.default = ExistIndexOrCreateIndex;
;
