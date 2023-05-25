import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import StartConversationOpenai from "../../application/use-cases/create-conversation-openai";
interface Context {
  succeed: (response: any) => void;
}

export default class IdentifyLastTalk {
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private triggerConversation: StartConversationOpenai;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.triggerConversation = new StartConversationOpenai();
  }

  public async identifyLastTalk(similarConversation: string, ultimaFrase: string, context: Context): Promise<any>{
    try {
      const regex = /[\\"]/g;
      const cleanSimilarConversation =  similarConversation.replace(regex, '');
      const response = await this.triggerConversation.createConversationOpenai(cleanSimilarConversation, ultimaFrase, context);
      return response;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}