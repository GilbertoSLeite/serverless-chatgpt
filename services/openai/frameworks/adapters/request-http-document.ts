import { ApiRequestService } from "../../../../commons/api-request/api-request";
import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

const url = process.env.HTTP_DOCS || '';

export default class RequestHTTPDocument {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  private apiRequest: ApiRequestService;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.apiRequest = new ApiRequestService();
  }

  public async requestHttpDocument(): Promise<any>{
    try {      
      const config = {
        url,
        method: 'GET',
      }
      const docsPdf = this.apiRequest.apiRequest(config);
      return docsPdf;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;          
    }
  }

}