export default class FirstInteractionPrompt{
  public promptPrefix(textConversation: string, conversation: string){
    const prompt_prefix = `<|im_start|>system
    Use as seguintes peças de contexto para responder no português brasileiro, em tom formal à pergunta no final. Se você não souber a resposta, apenas diga que não sabe. 

    ${textConversation}

    <|im_end|>
    <|im_start|>user 
    ${conversation} 

    <|im_end|>
    <|im_start|>assistant`
    return prompt_prefix
  };
}
