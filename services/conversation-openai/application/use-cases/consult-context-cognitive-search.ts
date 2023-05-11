import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import { HttpResponseTypeAdapterFactoryImplementation } from '../../../../commons/http-response/http-response-type-adapter-factory';

const SEARCH_ENDPOINT: string = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY: string  = process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME: string  = process.env.SEARCH_INDEX_NAME || '';

const client = new SearchClient(
  SEARCH_ENDPOINT,
  SEARCH_INDEX_NAME,
  new AzureKeyCredential(SEARCH_KEY)
);

interface Context {
  succeed: (response: any) => void;
}
export class CognitiveSearch {
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();    
  }

    async getContexts(conversation: any[], context: Context): Promise<any> {
      try {
          const query = (conversation.length === 1 ? conversation[0] : conversation.join(' OR '));
          const searchOptions = {
            includeTotalCount: true,
          };
          const result = await client.search(query, searchOptions);
          console.log(`Retorna da Consulta aos Indexer: ${JSON.stringify(result, null, 2)}`);
          return result;        
      } catch (error: any) {
        const { message } = error;
        const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
        return context.succeed(errorResponse);        
      }
    }
}
