"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateResponseInsertDocument {
    modelResults(results) {
        return results.map((result) => ({
            id: result.key,
            inserido: result.succeeded,
        }));
    }
}
exports.default = TemplateResponseInsertDocument;
