import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import IndexSchema from "../../domain/entities/index_schema";

export default class DefineSchemaIndexers {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private indexSchema: IndexSchema

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.indexSchema = new IndexSchema()
  }
  public async defineSchemaIndexers(documentFormatText: any[]){
    try {
      const arrayPromise: any[] = [];
      for (const iteratorDocument of documentFormatText) {
        const promisesIndexSchema = this.indexSchema.setTitleContent('assistcard', iteratorDocument);
        arrayPromise.push(promisesIndexSchema);
      }
      const entityIndexers = await Promise.all(arrayPromise);
      return entityIndexers
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;         
    }
  }
}