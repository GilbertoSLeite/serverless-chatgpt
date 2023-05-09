import { loggerDependencies } from '../../structure-logger/logger-entry-interface';
import { InfoLogger } from '../../structure-logger/logger/info-logger';
import Response from '../http-response';

const infoLog = new InfoLogger(loggerDependencies);

export class OkResponse implements Response {  
  public statusCode!: number;

  public body!: boolean | number | string;

  public getResponse(message: boolean | number | string) { 
    this.statusCode = 200;
    this.body = message;
    const responseBadRequest = new Response(this.statusCode, this.body);
    
    infoLog.infoLogger('http-response-type.ts', 'Retorno da Requisição com Sucesso', 'Resposta HTTP', { statuCode: 200, body: message });
    return responseBadRequest;
  }
}