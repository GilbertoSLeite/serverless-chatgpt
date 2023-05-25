import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import TextCleaner from "./clean-text";

export default class ConvertPdfToTxt {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private textClean: TextCleaner

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.textClean = new TextCleaner();
  }

  public async convertPdfToTxt(docsToConvert: string): Promise<any>{
    try {
      const loader = new PDFLoader(docsToConvert, {
        splitPages: false,
      });
      const docsConvertedPdfToTxt = await loader.load();      
      const pageContent = docsConvertedPdfToTxt[0].pageContent;
      return pageContent;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;          
    }

  }
}