import { LogEntry, LoggerDependencies } from '../logger-entry-interface';

export class ErrorLogger  {
  constructor(private preparingLogger: LoggerDependencies) {}
  
  errorLogger(
    eventSource: string,
    message: string,
    transactionId?: string | null,
    context?: { 
      [key: string]: string | number | boolean | null | object | undefined 
    }) {
    const timestamp = this.preparingLogger.parseISODate(this.preparingLogger.formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));

    const entry: LogEntry = {
      level: 'error',
      timestamp,
      eventSource,
      message,
      transactionId,
      context,
    };
    this.preparingLogger.createLogger.entryLog(entry);
  }
}