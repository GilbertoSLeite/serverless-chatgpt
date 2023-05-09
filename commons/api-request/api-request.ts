import axios, { AxiosRequestConfig } from 'axios';
import StatusResponse from './status-response';
import ApiRequestConfig from './api-request-config';
import { HttpResponseTypeAdapterFactoryImplementation } from '../http-response/http-response-type-adapter-factory';

export default interface ApiRequest {
  apiRequest(config: ApiRequestConfig): Promise<any>;
}

export class ApiRequestService implements ApiRequest {
  
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor() {
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async apiRequest(config: ApiRequestConfig): Promise<any> {
    try {      
      const { method, headers, params, url } = config;
      
      const axiosConfig: AxiosRequestConfig = {
        url,
        method,
        headers,
        params
      };

      const response = await axios(axiosConfig);
      const buffer = Buffer.from(response.data);
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    } catch (error: any) {
      const { message } = error;
      const statusRespose: StatusResponse = {
        400: (errorMessage: string) => this.httpResponse.badRequestResponse().getResponse(errorMessage),
        404: (errorMessage: string) => this.httpResponse.notFoundResponse().getResponse(errorMessage),
      };
      const errorResponse = (error.response ? statusRespose[error.response.status](error.response.statusText) : this.httpResponse.internalServerErrorResponse().getResponse(message));
     
      return errorResponse; 
    }
  }
}
