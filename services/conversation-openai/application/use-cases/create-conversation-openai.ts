import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import FirstInteractionPrompt from "../../domain/entities/create-answer-prompt";
import RephrasedQuestionPrompt from "../../domain/entities/rephrased-question-prompt";
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
  private rephrasedQuestionPrompt: RephrasedQuestionPrompt;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.searchConsultConversation = new CognitiveSearch();
    this.promptPrefix = new FirstInteractionPrompt();
    this.conversationOpenai = new ConfigurationOpenai();
    this.rephrasedQuestionPrompt = new RephrasedQuestionPrompt();
  }

  public async createConversationOpenai(conversation: string, ultimaFrase: string, context: Context){
    try {      
      const regex = /\?$/;
      const isQuestion = regex.test(ultimaFrase);
      if(!isQuestion) ultimaFrase = (ultimaFrase += "?");
      const convertedConversationToString = conversation.toString();   
      const rephrasedPrompt = this.rephrasedQuestionPrompt.rephrasedQuestionPrompt(ultimaFrase, convertedConversationToString);
      const responseRephrasedOpenai = await this.conversationOpenai.configureOpenia(rephrasedPrompt, context);      
      const resultContextConversation: any[] = await this.searchConsultConversation.sendContext(responseRephrasedOpenai, context);
      const getOnlyContent = resultContextConversation.map(contentData =>  contentData.content).join(' ');          
      const createFirstConversationPrompt = this.promptPrefix.createAnswerPrompt(getOnlyContent, responseRephrasedOpenai);
      const responseOpenai = await this.conversationOpenai.configureOpenia(createFirstConversationPrompt, context);
      return responseOpenai;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}