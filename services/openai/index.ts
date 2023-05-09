import { HttpResponseTypeAdapterFactoryImplementation } from "../../commons/http-response/http-response-type-adapter-factory";
import DownloadConvertPDFToTxt from "./interface/controller/download-convert-pdf-to-txt";

const httpResponse = new HttpResponseTypeAdapterFactoryImplementation();

export const handler = async () => {
  try {
    const convertPdfToTxt = new DownloadConvertPDFToTxt();
    const docsTxt = await convertPdfToTxt.downloadConvertPdfToTxt();
    return httpResponse.successResponse().getResponse(JSON.stringify(docsTxt));
  } catch (error: any) {
    const { message } = error;
    return httpResponse.internalServerErrorResponse().getResponse(message);
  };
}
