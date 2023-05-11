import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import StartConversationOpenai from "../../application/use-cases/start-conversation-openai";

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

  public async identifyLastTalk(body: string, context: Context): Promise<any>{
    try {
      const bodyParsed = JSON.parse(body);
      const { conversation } = bodyParsed 
      const arrayConversation = JSON.stringify(conversation).split(",");      
      const sizeConversation = arrayConversation.length || 0;
      if(sizeConversation === 1) return await this.triggerConversation.startingConversationOpenai(conversation, context);
      if(sizeConversation > 1){}
      const responseNotFound = this.httpResponse.notFoundResponse().getResponse('No conversation has been sent');
      return context.succeed(responseNotFound);      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}