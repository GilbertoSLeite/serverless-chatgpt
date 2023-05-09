"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogger = void 0;
class ErrorLogger {
    constructor(preparingLogger) {
        this.preparingLogger = preparingLogger;
    }
    errorLogger(eventSource, message, transactionId, context) {
        const timestamp = this.preparingLogger.parseISODate(this.preparingLogger.formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
        const entry = {
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
exports.ErrorLogger = ErrorLogger;
