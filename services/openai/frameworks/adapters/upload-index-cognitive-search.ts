import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import { loggerDependencies } from "../../../../commons/structure-logger/logger-entry-interface";
import { InfoLogger } from "../../../../commons/structure-logger/logger/info-logger";
import { AzureKeyCredential, SearchClient } from "@azure/search-documents";

const informationLog = new InfoLogger(loggerDependencies);
const SEARCH_ENDPOINT: string | undefined = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY: string | undefined = process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME: string  = process.env.SEARCH_INDEX_NAME || '';

// Create Search service client
// used to upload docs into Index
const client = new SearchClient(
  SEARCH_ENDPOINT,
  SEARCH_INDEX_NAME,
  new AzureKeyCredential(SEARCH_KEY)
);


export default class UploadIndexCognitiveSearch {
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();    
  }

  public async uploadDocuments(batchArray: any[]){
    try {      
      const statusUploadDocuments = await client.uploadDocuments(batchArray);
      informationLog.infoLogger('upload-index-cognitive-search.ts', 'Envio Documento para Cognitive Search', 'Cognitive Search', { sentData: statusUploadDocuments});
      return statusUploadDocuments;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  }
}