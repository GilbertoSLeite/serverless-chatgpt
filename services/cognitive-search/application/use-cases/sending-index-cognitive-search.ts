import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import ExistIndexOrCreateIndex from "../../frameworks/adapters/exist-index-or-create-index";
import UploadIndexCognitiveSearch from "../../frameworks/adapters/upload-index-cognitive-search";

export default class SendingIndexCognitiveSearch{
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private existIndex: ExistIndexOrCreateIndex;
  private uploadIndex: UploadIndexCognitiveSearch

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();    
    this.existIndex = new ExistIndexOrCreateIndex();  
    this.uploadIndex = new UploadIndexCognitiveSearch();  
  }

  public async sedingIndexCognitiveSearch(batchArray: any[]){
    try {
      const existIndex = await this.existIndex.existIndexOrCreateIndex();
      if(!existIndex.status && existIndex.status !== undefined) return this.httpResponse.notFoundResponse().getResponse(existIndex.errorResponse);
      const sendingDocsToCognitive = await this.uploadIndex.uploadDocuments(batchArray);
      return sendingDocsToCognitive;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;      
    }
  }

}