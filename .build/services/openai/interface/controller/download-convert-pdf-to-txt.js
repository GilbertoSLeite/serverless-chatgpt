"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const convert_pdf_txt_1 = __importDefault(require("../../application/use-cases/convert-pdf-txt"));
const split_doc_chunk_1 = __importDefault(require("../../application/use-cases/split-doc-chunk"));
const configuration_openai_1 = __importDefault(require("../../frameworks/adapters/configuration-openai"));
const request_http_document_1 = __importDefault(require("../../frameworks/adapters/request-http-document"));
const request_s3_document_1 = __importDefault(require("../../frameworks/adapters/request-s3-document"));
const filePath = process.env.LOCAL_DOCS || '';
class DownloadConvertPDFToTxt {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.requestS3Document = new request_s3_document_1.default();
        this.requestHttpDocunt = new request_http_document_1.default();
        this.convertPdfTxt = new convert_pdf_txt_1.default();
        this.configurationOpenai = new configuration_openai_1.default();
        this.splitDocChunk = new split_doc_chunk_1.default();
    }
    async downloadConvertPdfToTxt() {
        try {
            // const downloadPdf = await this.requestHttpDocunt.requestHttpDocument();
            // if(!downloadPdf) return this.httpResponse.notFoundResponse().getResponse('Arquivo Não Encontrado');
            const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
            const docsInTxt = this.splitDocChunk.splicDocChunk(docsConverted);
            return docsInTxt;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
    ;
}
exports.default = DownloadConvertPDFToTxt;
;
