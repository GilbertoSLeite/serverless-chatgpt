"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const exist_index_or_create_index_1 = __importDefault(require("../../frameworks/adapters/exist-index-or-create-index"));
const upload_index_cognitive_search_1 = __importDefault(require("../../frameworks/adapters/upload-index-cognitive-search"));
class SendingIndexCognitiveSearch {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.existIndex = new exist_index_or_create_index_1.default();
        this.uploadIndex = new upload_index_cognitive_search_1.default();
    }
    async sedingIndexCognitiveSearch(batchArray) {
        try {
            const existIndex = await this.existIndex.existIndexOrCreateIndex();
            if (!existIndex.status && existIndex.status !== undefined)
                return this.httpResponse.notFoundResponse().getResponse(existIndex.errorResponse);
            const sendingDocsToCognitive = await this.uploadIndex.uploadDocuments(batchArray);
            return sendingDocsToCognitive;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = SendingIndexCognitiveSearch;
