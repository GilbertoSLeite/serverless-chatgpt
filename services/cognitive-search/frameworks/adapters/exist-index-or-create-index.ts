import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import { index } from "../../../../commons/indexer/indexer";
import { loggerDependencies } from "../../../../commons/structure-logger/logger-entry-interface";
import { InfoLogger } from "../../../../commons/structure-logger/logger/info-logger";
import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";

const informationLog = new InfoLogger(loggerDependencies);
const SEARCH_ENDPOINT: string | undefined = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY: string | undefined = process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME: string = process.env.SEARCH_INDEX_NAME  || '';

const client = new SearchIndexClient(
  SEARCH_ENDPOINT, 
  new AzureKeyCredential(SEARCH_KEY)
  );


export default class ExistIndexOrCreateIndex{
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();    
  }

  public async existIndexOrCreateIndex(): Promise<any>{
    try {
      await client.getIndex(SEARCH_INDEX_NAME);
      return true;      
    } catch (error) {
      try {
        const indexCreate = await client.createIndex(index);   
        informationLog.infoLogger('exist-index-or-create-index.ts', 'Index cirado para Cognitive Search', 'Cognitive Search', { index: indexCreate});   
        return true;    
      } catch (error: any) {
        const { message } = error;
        const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
        return {
          status: false,
          errorResponse
        };
      }
    }
  }
};
