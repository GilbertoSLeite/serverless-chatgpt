"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureLogger = void 0;
const winston_1 = require("winston");
const configuring_logger_level_1 = require("./configuring-logger-level");
class StructureLogger {
    constructor() {
        this.createLogger = (0, winston_1.createLogger)({
            transports: configuring_logger_level_1.transportsConfig.debug.concat(configuring_logger_level_1.transportsConfig.info, configuring_logger_level_1.transportsConfig.debug, configuring_logger_level_1.transportsConfig.error),
        });
    }
    entryLog(inputData) {
        this.createLogger.log(inputData);
    }
}
exports.StructureLogger = StructureLogger;
