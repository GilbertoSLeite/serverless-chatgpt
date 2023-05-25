"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const clean_text_1 = __importDefault(require("../../application/use-cases/clean-text"));
const define_schema_of_indexers_1 = __importDefault(require("../../application/use-cases/define-schema-of-indexers"));
const sending_index_cognitive_search_1 = __importDefault(require("../../application/use-cases/sending-index-cognitive-search"));
const split_doc_chunk_1 = __importDefault(require("../../application/use-cases/split-doc-chunk"));
const download_convert_pdf_to_txt_1 = __importDefault(require("./download-convert-pdf-to-txt"));
class SendAzureDocument {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.downloadConvertPDFtoText = new download_convert_pdf_to_txt_1.default();
        this.splitDocChunk = new split_doc_chunk_1.default();
        this.defineSchemaIndexers = new define_schema_of_indexers_1.default();
        this.updloadIndexToCognitive = new sending_index_cognitive_search_1.default();
        this.textClean = new clean_text_1.default();
    }
    async sendAzureDocument(filePath) {
        try {
            const docsConverted = await this.downloadConvertPDFtoText.downloadConvertPdfToTxt(filePath);
            const docsInChunk = await this.splitDocChunk.splicDocChunk(docsConverted);
            const pageContentClean = await this.textClean.removeSpecialCharacters(docsInChunk);
            const entitiesIndexChunks = await this.defineSchemaIndexers.defineSchemaIndexers(pageContentClean);
            const sentDocsToCognitive = await this.updloadIndexToCognitive.sedingIndexCognitiveSearch(entitiesIndexChunks);
            return sentDocsToCognitive;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = SendAzureDocument;
