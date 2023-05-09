import { BadRequestResponse } from './http-response-types/bad-request-response';
import { ForbiddenResponse } from './http-response-types/forbidden-response';
import { InternalServerErrorResponse } from './http-response-types/internal-server-error-response';
import { NotFoundResponse } from './http-response-types/not-found-response';
import { OkResponse } from './http-response-types/ok-response';

interface HttpResponseTypeAdapterFactory {
  badRequestResponse(): BadRequestResponse
  notFoundResponse(): NotFoundResponse
  forbiddenResponse(): ForbiddenResponse
  internalServerErrorResponse(): InternalServerErrorResponse
  successResponse(): OkResponse
}

export class HttpResponseTypeAdapterFactoryImplementation implements HttpResponseTypeAdapterFactory {
  
  public badRequestResponse(): BadRequestResponse {
    return new BadRequestResponse();
  }

  public notFoundResponse(): NotFoundResponse {
    return new NotFoundResponse();
  }

  public forbiddenResponse(): ForbiddenResponse {
    return new ForbiddenResponse();
  }

  public internalServerErrorResponse(): InternalServerErrorResponse {
    return new InternalServerErrorResponse();
  }

  public successResponse(): OkResponse {
    return new OkResponse();
  }
}
