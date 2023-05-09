"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body;
    }
}
Response.headers = { 'Content-Type': 'application/json' };
exports.default = Response;
