"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const text_splitter_1 = require("langchain/text_splitter");
class SplitDocChunk {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async splicDocChunk(docsConvertedPdfToTxt) {
        try {
            const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                chunkSize: 1000
            });
            const docs = await textSplitter.createDocuments([docsConvertedPdfToTxt]);
            return docs;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = SplitDocChunk;
