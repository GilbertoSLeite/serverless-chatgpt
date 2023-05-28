import { HttpResponseTypeAdapterFactoryImplementation }  from "../../../../../commons/http-response/http-response-type-adapter-factory";
import StartConversationOpenai from "../../../application/use-cases/conversation-openai/create-conversation-openai";
import ConversationCreationOpenai from "./conversation-creation-openai";

interface Context {
  succeed: (response: any) => void;
}

const conversationStarter = new StartConversationOpenai();

export default class ConversationCreationWrapper {
  private httpResponseProvider: HttpResponseTypeAdapterFactoryImplementation;
  private conversationCreationOpenai: ConversationCreationOpenai;

  constructor() {
    this.httpResponseProvider = new HttpResponseTypeAdapterFactoryImplementation();
    this.conversationCreationOpenai = new ConversationCreationOpenai(this.httpResponseProvider, conversationStarter);
  }

  public async createConversation(similarConversation: string, ultimaFrase: string, openai: any, context: Context): Promise<any> {
    return this.conversationCreationOpenai.createConversation(similarConversation, ultimaFrase, openai, context);
  }
}
