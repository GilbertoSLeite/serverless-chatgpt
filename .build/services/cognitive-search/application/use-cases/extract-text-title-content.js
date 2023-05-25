"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const pdf2json_1 = require("pdf2json");
class ExtractTextTitleContent {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async parsedPDF(filePath, startPage) {
        try {
            const pdfBuffer = await (0, promises_1.readFile)(filePath);
            const pdfParser = new pdf2json_1.PDFExtract();
            const pdfData = await pdfParser.extractBuffer(pdfBuffer, { type: "text" });
            const lines = pdfData.pages
                .slice(startPage - 1)
                .map((page) => page.content)
                .join("\n");
            const numPages = pdfData.pages.length;
            const objectLinesPages = {
                lines,
                numPages
            };
            return objectLinesPages;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = ExtractTextTitleContent;
