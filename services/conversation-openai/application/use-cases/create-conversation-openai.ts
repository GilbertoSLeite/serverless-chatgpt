import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import FirstInteractionPrompt from "../../domain/entities/create-answer-prompt";
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

  public async createConversationOpenai(conversation: string, context: Context){
    try {
      const convertedConversationToString = conversation.toString();
      const resultContextConversation: any[] = await this.searchConsultConversation.sendContext(convertedConversationToString, context);
      const getOnlyContent = resultContextConversation.map(contentData =>  contentData.content).join(' ');
      const createFirstConversationPrompt = await this.promptPrefix.createAnswerPrompt(getOnlyContent, conversation);
      const responseOpenai = await this.conversationOpenai.configureOpenia(createFirstConversationPrompt);
      return responseOpenai;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}