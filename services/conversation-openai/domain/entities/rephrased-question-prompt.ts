const client = process.env.CLIENT;
const product = process.env.PRODUCT;
export default class RephrasedQuestionPrompt{
  public async rephrasedQuestionPrompt(lastUserQuestion: string, contextConversations: string){
    const prompt_prefix = `<|im_start|>system
    Faça o seguinte passo a passo e retorne uma única e exclusiva pergunta:
    
    1º: Você não está autorizado a perguntar sobre assuntos referente a empresa ou grupo ${client}.
    2º: Você não está autorizado a perguntar sobre aquicições, finanças ou sócios da empresa e/ou grupo ${client}.
    3º: Pergunte única e exlusivamente sobre o produto ${product} da ${client}.
    4º: Se ${lastUserQuestion} for em inglês, a pergunte que será formulada deverá ser em português do Brasil.
    5º: Respeitando os passos 1, 2 e 3, reformule a pergunta ${lastUserQuestion} de forma curta e objetiva com base no contexto ${contextConversations}.
        
    <|im_end|>
    <|im_start|>user 

    <|im_end|>
    <|im_start|>assistant`
    return prompt_prefix
  };
}