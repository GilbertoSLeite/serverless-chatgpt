import { format, parseISO } from 'date-fns';
import { StructureLogger } from './structure-logger';

export interface LogEntry {
  level: string;
  timestamp: Date;
  eventSource: string;
  message: string;
  transactionId?: string | null | undefined;
  context?: {
    [key: string]: string | number | boolean | null | object | undefined | void
  };
}

export interface LoggerDependencies {
  createLogger: StructureLogger;
  formatDate: typeof format;
  parseISODate: typeof parseISO;
}

export const loggerDependencies: LoggerDependencies = {
  createLogger: new StructureLogger(),
  formatDate: format,
  parseISODate: parseISO,
};
