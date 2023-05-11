"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OtherInteractionPrompt {
    promptPrefix(textConversation, conversation, lastConversation) {
        const prompt_prefix = `<|im_start|>system
    Use os seguintes contextos para responder adotando um tom formal, no português brasileiro, a pergunta no final. Se você não souber a resposta, apenas diga que não sabe. 

    ${textConversation}

    Chat History:
    ${conversation}

    <|im_end|>
    <|im_start|>user 
    ${lastConversation} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = OtherInteractionPrompt;
