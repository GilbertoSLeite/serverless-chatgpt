"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportsConfig = void 0;
const winston_1 = require("winston");
const { combine, json, label, timestamp } = winston_1.format;
const isTestMode = process.env.NODE_ENV === 'test';
const commonsOptions = {
    format: combine(label({
        label: 'Zenvia',
    }), timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), json()),
};
exports.transportsConfig = {
    debug: [
        new winston_1.transports.Console({
            level: isTestMode ? 'silent' : 'debug',
            ...commonsOptions,
        }),
    ],
    info: [
        new winston_1.transports.Console({
            level: isTestMode ? 'silent' : 'info',
            ...commonsOptions,
        }),
    ],
    error: [
        new winston_1.transports.Console({
            level: isTestMode ? 'silent' : 'error',
            ...commonsOptions,
        }),
    ],
};
