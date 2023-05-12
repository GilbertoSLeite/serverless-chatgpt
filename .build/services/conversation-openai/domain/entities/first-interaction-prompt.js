"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirstInteractionPrompt {
    promptPrefix(contextCognitiveSearch, userQuestion) {
        const prompt_prefix = `<|im_start|>system
    Use as seguintes peças de contexto para responder no português brasileiro, em tom formal à pergunta no final. Se você não souber a resposta, apenas diga que não sabe. 

    ${contextCognitiveSearch}

    <|im_end|>
    <|im_start|>user 
    ${userQuestion} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = FirstInteractionPrompt;
