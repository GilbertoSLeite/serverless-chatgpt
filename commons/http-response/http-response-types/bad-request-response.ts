import { loggerDependencies } from '../../structure-logger/logger-entry-interface';
import { ErrorLogger } from '../../structure-logger/logger/error-logger';
import Response from '../http-response';

const errorLog = new ErrorLogger(loggerDependencies);

export class BadRequestResponse extends Error implements Response {  
  public statusCode!: number;

  public body!: boolean | number | string;

  public getResponse(message: boolean | number | string) {
    this.statusCode = 400;
    this.body = message;  
    const responseBadRequest = new Response(this.statusCode, this.body);
    errorLog.errorLogger('http-response-type.ts', 'Requisição com Erro Bad Request', 'Resposta HTTP', { statuCode: 400, body: message });

    return responseBadRequest;
  }
}