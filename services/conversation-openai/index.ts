import { HttpResponseTypeAdapterFactoryImplementation } from "../../commons/http-response/http-response-type-adapter-factory";
import IdentifyLastTalk from "./interface/controller/identify-last-talk";

const httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
const identifyLastTalk = new IdentifyLastTalk();

export const handler = async (event: any, context: any) => {
  try {
    const { body } = event;
    const response = await identifyLastTalk.identifyLastTalk(body, context);
    return httpResponse.successResponse().getResponse(JSON.stringify(response.replace(/\n/g, ' ')));
  } catch (error: any) {
    const { message } = error;
    return httpResponse.internalServerErrorResponse().getResponse(message);
  };
}
