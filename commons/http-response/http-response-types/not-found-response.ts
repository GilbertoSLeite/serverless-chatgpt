import { loggerDependencies } from '../../structure-logger/logger-entry-interface';
import { ErrorLogger } from '../../structure-logger/logger/error-logger';
import Response from '../http-response';

const errorLog = new ErrorLogger(loggerDependencies);

export class NotFoundResponse extends Error implements Response {  
  public statusCode!: number;

  public body!: boolean | number | string;

  public getResponse(message: boolean | number | string) {   
    this.statusCode = 404;
    this.body = message;  
    const responseNotFound = new Response(this.statusCode, this.body);
    errorLog.errorLogger('http-response-type.ts', 'Requisição com Erro Not Found', 'Resposta HTTP', { statuCode: 404, body: message });

    return responseNotFound;
  }
}