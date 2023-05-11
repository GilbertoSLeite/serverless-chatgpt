"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
class ConvertPdfToTxt {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async convertPdfToTxt(docsToConvert) {
        try {
            const loader = new pdf_1.PDFLoader(docsToConvert, {
                splitPages: false,
            });
            const docsConvertedPdfToTxt = await loader.load();
            const pageContent = docsConvertedPdfToTxt[0].pageContent;
            return pageContent;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = ConvertPdfToTxt;
