import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

interface ResponseAzure {
  results: {
    succeeded: boolean;
    errorMessage: string | null;
  }[];
}

interface ResultObject {
  enviadosSucesso: number,
  enviadosErro: number,
  erroOcorrido?: string | undefined | null
}
export default class TemplateResponseInsertDocument{

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async templateReponseInsertDocument(response: ResponseAzure){

    // Cálculo da quantidade de "succeeded" igual a true
    const succeededCount = response.results.filter(result => result.succeeded === true).length;
    
    // Cálculo da quantidade de "errorMessage" diferente de null
    const errorCount = response.results.filter(result => result.errorMessage !== null).length;
    
    // Montagem do objeto com as três propriedades
    const resultObject: ResultObject = {
      enviadosSucesso: succeededCount,
      enviadosErro: errorCount,
    };
    
    // Verificação se há errorMessage diferente de null e adição da propriedade erroOcorrido
    const hasError = response.results.some(result => result.errorMessage !== null);
    if (hasError) {
      const errorResult = response.results.find(result => result.errorMessage !== null);
      if (errorResult) {
        resultObject.erroOcorrido = errorResult.errorMessage;
      }
    }
    
    return resultObject;
    
  }
}
