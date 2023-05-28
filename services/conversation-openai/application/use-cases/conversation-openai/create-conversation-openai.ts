import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../../commons/http-response/http-response-type-adapter-factory";
import { loggerDependencies } from "../../../../../commons/structure-logger/logger-entry-interface";
import { InfoLogger } from "../../../../../commons/structure-logger/logger/info-logger";
import FirstInteractionPrompt from "../../../domain/entities/create-answer-prompt";
import RephrasedQuestionPrompt from "../../../domain/entities/rephrased-question-prompt";
import ConfigurationOpenai from "../../../frameworks/adapters/configuration-openai";
import { CognitiveSearch } from "../context-cognitive-search/consult-context-cognitive-search";
import ConversationStarter from "./conversation-start-contract";

const logger = new InfoLogger(loggerDependencies);
interface Context {
  succeed: (response: any) => void;
}

export default class StartConversationOpenai implements ConversationStarter {
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

  public async createConversationOpenai(conversation: string, ultimaFrase: string, openai: any, context: Context){
    try {      
      const regex = /\?$/;
      const isQuestion = regex.test(ultimaFrase);
      if(!isQuestion) ultimaFrase = (ultimaFrase += "?");
      const convertedConversationToString = conversation.toString();   
      logger.infoLogger('create-conversation-openai.ts', 'Contexto da Conversa para Refraseamento', 'chatGPT', { contextoRefraseamento: convertedConversationToString });
      console.time('rephrasedQuestionPrompt');
      const rephrasedPrompt = await this.rephrasedQuestionPrompt.rephrasedQuestionPrompt(ultimaFrase, convertedConversationToString);
      console.timeEnd('rephrasedQuestionPrompt');
      console.time('configureOpenia');
      const responseRephrasedOpenai = await this.conversationOpenai.configureOpenia(rephrasedPrompt, openai, context);  
      console.timeEnd('configureOpenia');
      logger.infoLogger('create-conversation-openai.ts', 'Construção das Conversas com ChatGPT', 'chatGPT', { fraseRefraseada: responseRephrasedOpenai });    
      console.time('searchConsultConversation');
      const resultContextConversation: any[] = await this.searchConsultConversation.sendContext(responseRephrasedOpenai, context);
      console.timeEnd('searchConsultConversation');
      const getOnlyContent = resultContextConversation.map(contentData =>  contentData.content).join(' ');          
      logger.infoLogger('create-conversation-openai.ts', 'Contexto do Cognitive Search', 'chatGPT', { contextoCognitiveSearch: getOnlyContent });  
      console.time('createAnswerPrompt');
      const createFirstConversationPrompt = await this.promptPrefix.createAnswerPrompt(getOnlyContent, responseRephrasedOpenai);
      console.timeEnd('createAnswerPrompt');
      console.time('configureOpeniaResponseOpenai');
      const responseOpenai = await this.conversationOpenai.configureOpenia(createFirstConversationPrompt, openai, context);
      console.timeEnd('configureOpeniaResponseOpenai');
      return responseOpenai;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}