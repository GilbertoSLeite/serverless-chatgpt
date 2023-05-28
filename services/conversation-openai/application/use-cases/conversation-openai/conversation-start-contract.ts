interface Context {
  succeed: (response: any) => void;
}

export default interface ConversationStarter {
  createConversationOpenai(conversation: string, ultimaFrase: string, openai: any, context: Context): Promise<any>;
}
