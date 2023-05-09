import { LogEntry, LoggerDependencies } from '../logger-entry-interface';

export class WarningLogger  {
  constructor(private preparingLogger: LoggerDependencies) {}
  
  warningLogger(
    eventSource: string,
    message: string,
    transactionId?: string | null,
    context?: { 
      [key: string]: string | number | boolean | null | object | undefined 
    }) {
    const timestamp = this.preparingLogger.parseISODate(this.preparingLogger.formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));

    const entry: LogEntry = {
      level: 'info',
      timestamp,
      eventSource,
      message,
      transactionId,
      context,
    };
    this.preparingLogger.createLogger.entryLog(entry);
  }
}