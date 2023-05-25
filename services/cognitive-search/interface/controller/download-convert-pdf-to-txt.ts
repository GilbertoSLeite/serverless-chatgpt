import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import ConvertPdfToTxt from "../../application/use-cases/convert-pdf-txt";

export default class DownloadConvertPDFToTxt {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private convertPdfTxt: ConvertPdfToTxt;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.convertPdfTxt = new ConvertPdfToTxt();
  }

  public async downloadConvertPdfToTxt(filePath: string): Promise<any>{
    try {
      const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
      return docsConverted;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  };
};