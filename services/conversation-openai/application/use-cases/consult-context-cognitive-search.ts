import { AzureKeyCredential, SearchClient, QueryType } from '@azure/search-documents';
import { HttpResponseTypeAdapterFactoryImplementation } from '../../../../commons/http-response/http-response-type-adapter-factory';
import { QueryLanguage } from '@azure/search-documents';
import { QuerySpellerType } from '@azure/search-documents';

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
  private readonly queryType: QueryType = 'semantic'
  private readonly queryLanguage: QueryLanguage = 'pt-BR'
  private readonly querySpeller: QuerySpellerType = 'lexicon'

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();    
  }

    public async sendContext(question: string, context: Context): Promise<any> {
      try {
        const resultsQuery: any[] = [];
          const searchOptions = {
            top: 3,
            includeTotalCount: true,
            queryType: this.queryType,
            queryLanguage: this.queryLanguage,
          };
          const returnsFromQuery = await client.search(question, searchOptions)
          for await (const results of returnsFromQuery.results) resultsQuery.push(results.document);
          return resultsQuery;  
      } catch (error: any) {
        const { message } = error;
        const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
        return context.succeed(errorResponse);        
      }
    }
}
