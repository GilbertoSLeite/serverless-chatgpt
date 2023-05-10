"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
class UuidGenerator {
    async generateId(param) {
        const timestamp = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd_HH:mm:ss');
        const uuid = (0, uuid_1.v4)();
        return `${timestamp}_${param}_${uuid}`;
    }
}
exports.default = UuidGenerator;
