import HttpResponseTypeAdapterFactory  from "../../../../../commons/http-response/http-response-type-adapter-factory";
import ConversationStarter from "../../../application/use-cases/conversation-openai/conversation-start-contract";

interface Context {
  succeed: (response: any) => void;
}

export default class ConversationCreationOpenai {
  constructor(
    private httpResponseProvider: HttpResponseTypeAdapterFactory,
    private conversationStarter: ConversationStarter
  ) {}

  public async createConversation(similarConversation: string, ultimaFrase: string, openai: any, context: Context): Promise<any> {
    try {
      const cleanSimilarConversation = this.cleanConversation(similarConversation);
      console.time('createConversationOpenai');
      const response = await this.conversationStarter.createConversationOpenai(
        cleanSimilarConversation,
        ultimaFrase,
        openai,
        context
      );
      console.timeEnd('createConversationOpenai');
      return response;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.createErrorResponse(message);
      return context.succeed(errorResponse);
    }
  }

  private cleanConversation(conversation: string): string {
    const regex = /[\\"]/g;
    return conversation.replace(regex, '');
  }

  private createErrorResponse(message: string): any {
    return this.httpResponseProvider.internalServerErrorResponse().getResponse(message)
  }
}
