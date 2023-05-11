import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import { CognitiveSearch } from "./consult-context-cognitive-search";

interface Context {
  succeed: (response: any) => void;
}

export default class StartConversationOpenai{
  private searchConsultConversation: CognitiveSearch
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.searchConsultConversation = new CognitiveSearch();
  }

  public async startingConversationOpenai(conversation: any[], context: Context){
    try {
      console.log(`conversation em startingConversationOpenai: ${JSON.stringify(conversation, null, 2)}`);
      const resultContextConversation = await this.searchConsultConversation.getContexts(conversation, context);
      return resultContextConversation;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}