import { HttpResponseTypeAdapterFactoryImplementation } from "../../commons/http-response/http-response-type-adapter-factory";
import SubjectAnalyzer from "./interface/controller/analyzing-subject-similarity";
import IdentifyLastTalk from "./interface/controller/identify-last-talk";

const httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
const searchByConversations = new IdentifyLastTalk();
const similarity = new SubjectAnalyzer();

export const handler = async (event: any, context: any) => {
  try {
    const { body } = event;
    const bodyParsed = JSON.parse(body);
    const { conversation } = bodyParsed;
    const lastPhrase = conversation[conversation.length - 1];
    const similarConversation = await similarity.findConvergentSubjects(conversation, lastPhrase);
    console.log(`Similaridade: ${similarConversation}`);
    const response = await searchByConversations.identifyLastTalk(similarConversation, lastPhrase, context);
    const cleanResponse = response.replace(/\n/g, '') 
    return httpResponse.successResponse().getResponse(JSON.stringify(cleanResponse));
  } catch (error: any) {
    const { message } = error;
    return httpResponse.internalServerErrorResponse().getResponse(message);
  };
}
