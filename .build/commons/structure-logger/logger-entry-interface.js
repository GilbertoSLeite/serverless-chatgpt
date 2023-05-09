"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerDependencies = void 0;
const date_fns_1 = require("date-fns");
const structure_logger_1 = require("./structure-logger");
exports.loggerDependencies = {
    createLogger: new structure_logger_1.StructureLogger(),
    formatDate: date_fns_1.format,
    parseISODate: date_fns_1.parseISO,
};
