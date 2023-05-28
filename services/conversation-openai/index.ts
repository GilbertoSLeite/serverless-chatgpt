import { Configuration, OpenAIApi } from "openai";
import { HttpResponseTypeAdapterFactoryImplementation } from "../../commons/http-response/http-response-type-adapter-factory";
import { loggerDependencies } from "../../commons/structure-logger/logger-entry-interface";
import { InfoLogger } from "../../commons/structure-logger/logger/info-logger";
import SubjectAnalyzer from "./interface/controller/analyzing-subject-similarity/subject-analyzer";
import ConversationCreationWrapper from "./interface/controller/conversation-creation-openai/conversatio-creation-wrapper";

const httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
const searchByConversations = new ConversationCreationWrapper();
const similarity = new SubjectAnalyzer();
const logger = new InfoLogger(loggerDependencies);
const apiKey: string | undefined = process.env.OPENAI_API_KEY;
const basePath: string | undefined = process.env.BASE_PATH;
const apiVersion: string | undefined = process.env.API_VERSION;
const configuration = new Configuration({
  apiKey,
  basePath,
  baseOptions: {
    headers: {
      'api-key': apiKey
    },
    params: {
      'api-version': apiVersion // this might change. I got the current value from the sample code at https://oai.azure.com/portal/chat
    }
  }
});
const openai = new OpenAIApi(configuration);

export const handler = async (event: any, context: any) => {
  try {
    const { body } = event;
    const bodyParsed = JSON.parse(body);
    const { conversation } = bodyParsed;
    logger.infoLogger('index.ts', 'Conversas Recebidas', 'chatGPT', { conversas: JSON.stringify(conversation, null, 2) });
    const lastPhrase = conversation[conversation.length - 1];
    logger.infoLogger('index.ts', 'Última Pergunta Recebidas', 'chatGPT', { ultimaPergunta: lastPhrase });
    const similarConversation = await similarity.findConvergentSubjects(conversation, lastPhrase, context);
    logger.infoLogger('index.ts', 'Vetor de Similaridade', 'chatGPT', { similaridadePalavras: similarConversation });
    const response = await searchByConversations.createConversation(similarConversation, lastPhrase, openai, context);
    const cleanResponse = response.replace(/\n/g, '') 
    return httpResponse.successResponse().getResponse(JSON.stringify(cleanResponse));
  } catch (error: any) {
    const { message } = error;
    return httpResponse.internalServerErrorResponse().getResponse(message);
  };
}
