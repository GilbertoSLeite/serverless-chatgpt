"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoLogger = void 0;
class InfoLogger {
    constructor(preparingLogger) {
        this.preparingLogger = preparingLogger;
    }
    infoLogger(eventSource, message, transactionId, context) {
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
exports.InfoLogger = InfoLogger;
