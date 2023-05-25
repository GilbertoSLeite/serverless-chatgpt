"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextCleaner {
    async removerCaracteresEspeciais(texto) {
        const textoLimpo = texto.replace(/\n/g, ' ').replace(/[^a-zA-Z0-9\s]/g, '');
        return textoLimpo;
    }
}
exports.default = TextCleaner;
