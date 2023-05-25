"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const convert_pdf_txt_1 = __importDefault(require("../../application/use-cases/convert-pdf-txt"));
class DownloadConvertPDFToTxt {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.convertPdfTxt = new convert_pdf_txt_1.default();
    }
    async downloadConvertPdfToTxt(filePath) {
        try {
            const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
            return docsConverted;
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
