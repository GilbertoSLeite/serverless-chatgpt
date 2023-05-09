"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningLogger = void 0;
class WarningLogger {
    constructor(preparingLogger) {
        this.preparingLogger = preparingLogger;
    }
    warningLogger(eventSource, message, transactionId, context) {
        const timestamp = this.preparingLogger.parseISODate(this.preparingLogger.formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
        const entry = {
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
exports.WarningLogger = WarningLogger;
