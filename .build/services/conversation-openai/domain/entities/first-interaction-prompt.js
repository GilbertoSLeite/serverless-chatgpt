"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirstInteractionPrompt {
    promptPrefix(textConversation, conversation) {
        const prompt_prefix = `<|im_start|>system
    Use as seguintes peças de contexto para responder no português brasileiro, em tom formal à pergunta no final. Se você não souber a resposta, apenas diga que não sabe. 

    ${textConversation}

    <|im_end|>
    <|im_start|>user 
    ${conversation} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = FirstInteractionPrompt;
