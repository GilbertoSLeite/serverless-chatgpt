"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client = process.env.CLIENT;
const product = process.env.PRODUCT;
class RephrasedQuestionPrompt {
    rephrasedQuestionPrompt(lastUserQuestion, contextConversations) {
        const prompt_prefix = `<|im_start|>system
    Vamos seguir o seguinte passo a passo e retorne única e exclusivamente uma pergunta:
    1ª: Você está autorizado a pergunta somente sobre ${product}
    2º: Você não está autorizado a perguntar sobre assuntos referente a empresa e o grupo ${client}
    3º: Você não está autorizado a perguntar sobre aquicições, finanças ou sócios da empresa e/ou grupo ${client}
    4º: Seu objetivo é perguntar única e exlusivamente sobre o produto ${product} da ${client}
    5º: Agora analise o contexto ${contextConversations} e a pergunta ou afirmação do usuário ${lastUserQuestion} e contrua um resumo do assunto com base na maior similaridade possível    
    6º: Com base das informações geradas no passo 5º formule uma pergunta curta e objetiva respeitando as informações dos passos: 1, 2, 3 e 4
        
    <|im_end|>
    <|im_start|>user 

    <|im_end|>
    <|im_start|>assistant`;
        return prompt_prefix;
    }
    ;
}
exports.default = RephrasedQuestionPrompt;
