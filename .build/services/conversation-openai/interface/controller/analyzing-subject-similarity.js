"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const similarity = __importStar(require("string-similarity"));
class SubjectAnalyzer {
    async findConvergentSubjects(array, lastPhrase) {
        const regex = /[\\"]/g;
        let assuntosConvergentes = [];
        assuntosConvergentes.push(lastPhrase);
        for (const frase1 of array) {
            for (const frase2 of array) {
                if (frase1.replace(regex, '') === frase2.replace(regex, '')) {
                    continue;
                }
                const similaridade = similarity.compareTwoStrings(frase1.replace(regex, ''), frase2.replace(regex, ''));
                if (similaridade > 0.8) {
                    if (!assuntosConvergentes.includes(frase1.replace(regex, ''))) {
                        assuntosConvergentes.push(frase1.replace(regex, ''));
                    }
                    if (!assuntosConvergentes.includes(frase2.replace(regex, ''))) {
                        assuntosConvergentes.push(frase2.replace(regex, ''));
                    }
                }
            }
        }
        return assuntosConvergentes.join(', ');
    }
}
exports.default = SubjectAnalyzer;