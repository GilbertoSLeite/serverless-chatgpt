"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const http_response_type_adapter_factory_1 = require("../../commons/http-response/http-response-type-adapter-factory");
const download_convert_pdf_to_txt_1 = __importDefault(require("./interface/controller/download-convert-pdf-to-txt"));
const httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
const handler = async () => {
    try {
        const convertPdfToTxt = new download_convert_pdf_to_txt_1.default();
        const docsTxt = await convertPdfToTxt.downloadConvertPdfToTxt();
        return httpResponse.successResponse().getResponse(JSON.stringify(docsTxt));
    }
    catch (error) {
        const { message } = error;
        return httpResponse.internalServerErrorResponse().getResponse(message);
    }
    ;
};
exports.handler = handler;
