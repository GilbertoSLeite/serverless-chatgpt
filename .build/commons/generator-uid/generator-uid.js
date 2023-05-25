"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const client = process.env.SEARCH_INDEX_NAME || 'zenvia';
class UuidGenerator {
    async generateId() {
        const timestamp = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd_HH:mm:ss');
        const uuid = (0, uuid_1.v4)();
        const idString = JSON.stringify({
            clientName: client,
            timestamp,
            uuid
        });
        const idBase64 = Buffer.from(idString).toString('base64');
        return idBase64;
    }
}
exports.default = UuidGenerator;
