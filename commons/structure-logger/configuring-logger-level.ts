import { format, transports } from 'winston';

const { combine, json, label, timestamp } = format;

const isTestMode = process.env.NODE_ENV === 'test';

const commonsOptions = {
  format: combine(
    label({
      label: 'Zenvia',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', 
    }),
    json(),
  ),
};

export const transportsConfig = {
  debug: [
    new transports.Console({
      level: isTestMode ? 'silent' : 'debug',  
      ...commonsOptions,    
    }),
  ],
  info: [
    new transports.Console({
      level: isTestMode ? 'silent' : 'info',      
      ...commonsOptions,
    }),
  ],
  error: [
    new transports.Console({
      level: isTestMode ? 'silent' : 'error',     
      ...commonsOptions,
    }),
  ],
};