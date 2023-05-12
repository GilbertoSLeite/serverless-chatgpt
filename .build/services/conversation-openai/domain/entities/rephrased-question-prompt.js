"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RephrasedQuestionPrompt {
    rephrasedQuestionPrompt(chatHistory, lastUserQuestion) {
        const prompt_prefix = `<|im_start|>system
    Gere uma breve e objetiva pergunta de acompanhamento, que um usuário faria. Se a pergunta for em inlês traduça para português brasileiro. Não repita perguntas que já foram feitas. Gere apenas pergunta e somente pergunta e não gere nenhum texto nem antes ou depois da pergunta.
    Abaixo está um histórico da conversa até o momento e uma pergunta que será usada como base para a construção da sua nova pergunta.
    
    Chat History:
    ${chatHistory}

    <|im_end|>
    <|im_start|>user 
    Question:
    ${lastUserQuestion} 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = RephrasedQuestionPrompt;
