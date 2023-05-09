import { loggerDependencies } from '../../structure-logger/logger-entry-interface';
import { ErrorCriticalLogger } from '../../structure-logger/logger/critical-logger';
import Response from '../http-response';

const criticalLog = new ErrorCriticalLogger(loggerDependencies);

export class InternalServerErrorResponse extends Error implements Response {  
  public statusCode!: number;

  public body!: boolean | number | string;

  public getResponse(message: boolean | number | string) { 
    this.statusCode = 500;
    this.body = message;  
    const responseInternalServerError = new Response(this.statusCode, this.body);
    criticalLog.errorCriticalLogger('http-response-type.ts', 'Requisição com Erro Internal Server Error', 'Resposta HTTP', { statuCode: 500, body: message });

    return responseInternalServerError;
  }
}