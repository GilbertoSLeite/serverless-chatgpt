import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

interface QueryStringParameters {
  conversation: any[],
  context: {
    succeed: () => any
  },
}


export default class IdentifyLastTalk {
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async identifyLastTalk(queryStringParameters: QueryStringParameters, context: any): Promise<any>{
    try {
      const sizeConversation = queryStringParameters.conversation.length || 0;
      if(sizeConversation === 1){}
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