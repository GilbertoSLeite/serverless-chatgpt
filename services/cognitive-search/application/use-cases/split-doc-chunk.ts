import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default class SplitDocChunk {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async splicDocChunk(docsConvertedPdfToTxt: string): Promise<any[] | object> {
    try {
      const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000 
      });

      const docs = await textSplitter.createDocuments([docsConvertedPdfToTxt]);
      return docs;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  }
}