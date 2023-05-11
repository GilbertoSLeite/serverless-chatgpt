import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import FirstInteractionPrompt from "../../domain/entities/first-interaction-prompt";
import ConfigurationOpenai from "../../frameworks/adapters/configuration-openai";
import { CognitiveSearch } from "./consult-context-cognitive-search";

interface Context {
  succeed: (response: any) => void;
}

export default class StartConversationOpenai{
  private searchConsultConversation: CognitiveSearch
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private promptPrefix: FirstInteractionPrompt;
  private conversationOpenai: ConfigurationOpenai;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.searchConsultConversation = new CognitiveSearch();
    this.promptPrefix = new FirstInteractionPrompt();
    this.conversationOpenai = new ConfigurationOpenai();
  }

  public async startingConversationOpenai(conversation: any[], context: Context){
    try {
      const resultContextConversation: any[] = await this.searchConsultConversation.getContexts(conversation, context);
      const getOnlyContent = resultContextConversation.map(contentData =>  contentData.content).join(',');
      const createFirstConversationPrompt = this.promptPrefix.promptPrefix(getOnlyContent, conversation.join(','));
      const responseOpenai = this.conversationOpenai.configureOpenia(createFirstConversationPrompt);
      return responseOpenai;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}