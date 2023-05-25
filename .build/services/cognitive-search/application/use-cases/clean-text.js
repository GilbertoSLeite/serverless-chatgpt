"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextCleaner {
    async removeSpecialCharacters(texto) {
        const cleanText = texto.map((text) => text.replace(/\n/g, ' ').replace(/\s+/g, ' '));
        return cleanText;
    }
}
exports.default = TextCleaner;
