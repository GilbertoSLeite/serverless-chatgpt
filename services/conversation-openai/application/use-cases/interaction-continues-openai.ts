import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import RephrasedQuestionPrompt from "../../domain/entities/rephrased-question-prompt";
import ConfigurationOpenai from "../../frameworks/adapters/configuration-openai";
import StartConversationOpenai from "./create-conversation-openai";

interface Context {
  succeed: (response: any) => void;
}

export default class InteractionContinuesConversationOpenai{
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private promptPrefix: RephrasedQuestionPrompt;
  private conversationOpenai: ConfigurationOpenai;
  private askingAgainRephrased: StartConversationOpenai

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.promptPrefix = new RephrasedQuestionPrompt();
    this.conversationOpenai = new ConfigurationOpenai();
    this.askingAgainRephrased = new StartConversationOpenai();
  }

  public async interactionContinuesConversationOpenai(conversation: any[], context: Context){
    try {
      const lastConversation =  conversation.pop();
      const regex = /\?$/;
      const isQuestion = regex.test(lastConversation);
      if(isQuestion){
        const finallyResponseOpenai = await this.askingAgainRephrased.createConversationOpenai(lastConversation, context);
        return finallyResponseOpenai;      
      };
      const conversationToString = conversation.join(' , ');
      const rephrasedText = this.promptPrefix.rephrasedQuestionPrompt(conversationToString, lastConversation);
      const responseOpenai = await this.conversationOpenai.configureOpenia(rephrasedText);
      const responseOpenaiToString = responseOpenai.toString();
      const finallyResponseOpenai = await this.askingAgainRephrased.createConversationOpenai(responseOpenaiToString, context);
      return finallyResponseOpenai;      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);
    }
  }
}