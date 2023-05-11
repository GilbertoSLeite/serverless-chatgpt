import { AzureKeyCredential, SearchClient } from "@azure/search-documents";
import { HttpResponseTypeAdapterFactoryImplementation } from '../../../../commons/http-response/http-response-type-adapter-factory';

const SEARCH_ENDPOINT: string | undefined = process.env.SEARCH_ENDPOINT || '';
const SEARCH_KEY: string | undefined = 'KfeNTSs0cYlNJyP8q96Gbh60MGz5VAb4TVZwdPMNN6AzSeCCIQWa' //process.env.SEARCH_ADMIN_KEY || '';
const SEARCH_INDEX_NAME: string  = process.env.SEARCH_INDEX_NAME || '';

// Create Search service client
// used to upload docs into Index
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

    public async getContexts(conversation: any[], context: Context): Promise<any> {
      try {
        const resultsQuery: any[] = [];
          const query = (conversation.length === 1 ? conversation[0] : conversation.join(','));
          const searchOptions = {
            includeTotalCount: true,
            top: 3,
          };
          const returnsFromQuery = await client.search(query, searchOptions);
          for await (const results of returnsFromQuery.results) resultsQuery.push(results.document);
          return resultsQuery;  
      } catch (error: any) {
        const { message } = error;
        const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
        return context.succeed(errorResponse);        
      }
    }
}
