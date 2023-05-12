"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateAnswerPrompt {
    createAnswerPrompt(contextCognitiveSearch, question) {
        const prompt_prefix = `<|im_start|>system
    Use as seguintes informações para responder, adotando um postura humanizada e respeitosa. Se você não souber a resposta, apenas diga que não sabe. 
    Se a pergunta for inglês, traduza para português do Brasil e responda em português do Brasil.

    ${contextCognitiveSearch}

    <|im_end|>
    <|im_start|>user 
    ${question} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = CreateAnswerPrompt;