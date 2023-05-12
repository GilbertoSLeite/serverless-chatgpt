"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OtherInteractionPrompt {
    promptPrefix(contextCognitiveSearch, historyConversation, lastUserQuestion) {
        const prompt_prefix = `<|im_start|>system
    Use os seguintes contextos para responder adotando um tom formal, no português brasileiro, a pergunta no final. Se você não souber a resposta, apenas diga que não sabe. 

    ${contextCognitiveSearch}

    Chat History:
    ${historyConversation}

    <|im_end|>
    <|im_start|>user 
    ${lastUserQuestion} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = OtherInteractionPrompt;
