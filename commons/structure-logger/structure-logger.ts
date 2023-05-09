import { LogEntry } from './logger-entry-interface';
import { createLogger, Logger } from 'winston';
import { transportsConfig } from './configuring-logger-level';

export class StructureLogger {
  createLogger: Logger;
  
  constructor() {
    this.createLogger = createLogger({
      transports: transportsConfig.debug.concat(transportsConfig.info, transportsConfig.debug,  transportsConfig.error),
    });
  }
  
  entryLog(inputData: LogEntry) {
    this.createLogger.log(inputData);
  }
}