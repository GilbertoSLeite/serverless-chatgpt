import { HttpResponseTypeAdapterFactoryImplementation } from "../../commons/http-response/http-response-type-adapter-factory";
import SendAzureDocument from "./interface/controller/send-azure-document";
import TemplateResponseInsertDocument from "./interface/view/template-response-insert-document";

const httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
const filePath: string = process.env.LOCAL_DOCS || '';
const createTemplateResponse = new TemplateResponseInsertDocument();

export const handler = async () => {
  try {    
    const docsTxt = await new SendAzureDocument().sendAzureDocument(filePath);
    const modelsResponse = await createTemplateResponse.templateReponseInsertDocument(docsTxt);
    const stringifyData = JSON.stringify(modelsResponse);
    return httpResponse.successResponse().getResponse(stringifyData);
  } catch (error: any) {
    const { message } = error;
    return httpResponse.internalServerErrorResponse().getResponse(message);
  };
}
