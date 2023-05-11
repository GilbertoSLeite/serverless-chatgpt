"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveSearch = void 0;
const search_documents_1 = require("@azure/search-documents");
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const SEARCH_ENDPOINT = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY = 'KfeNTSs0cYlNJyP8q96Gbh60MGz5VAb4TVZwdPMNN6AzSeCCIQWa'; //process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME = process.env.SEARCH_INDEX_NAME || '';
// Create Search service client
// used to upload docs into Index
const client = new search_documents_1.SearchClient(SEARCH_ENDPOINT, SEARCH_INDEX_NAME, new search_documents_1.AzureKeyCredential(SEARCH_KEY));
class CognitiveSearch {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async getContexts(conversation, context) {
        try {
            const resultsQuery = [];
            const query = (conversation.length === 1 ? conversation[0] : conversation.join(','));
            const searchOptions = {
                includeTotalCount: true,
                top: 3,
            };
            const returnsFromQuery = await client.search(query, searchOptions);
            for await (const results of returnsFromQuery.results)
                resultsQuery.push(results.document);
            return resultsQuery;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return context.succeed(errorResponse);
        }
    }
}
exports.CognitiveSearch = CognitiveSearch;
