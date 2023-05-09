import { loggerDependencies } from '../../structure-logger/logger-entry-interface';
import { WarningLogger } from '../../structure-logger/logger/warning-logger';
import Response from '../http-response';

const warningLog = new WarningLogger(loggerDependencies);

export class ForbiddenResponse extends Error implements Response {  
  public statusCode!: number;

  public body!: boolean | number | string;

  public getResponse(message: boolean | number | string) { 
    this.statusCode = 403;
    this.body = message;  
    const responseForbidden = new Response(this.statusCode, this.body);
    warningLog.warningLogger('http-response-type.ts', 'Requisição Não Permitida Forbidden', 'Resposta HTTP', { statuCode: 403, body: message });

    return responseForbidden;
  }
}