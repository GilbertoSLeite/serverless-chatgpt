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
        this.queryType = 'semantic';
        this.queryLanguage = 'pt-BR';
        this.querySpeller = 'lexicon';
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async sendContext(question, context) {
        try {
            const resultsQuery = [];
            const searchOptions = {
                top: 3,
                includeTotalCount: true,
                queryType: this.queryType,
                queryLanguage: this.queryLanguage,
            };
            const returnsFromQuery = await client.search(question, searchOptions);
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
