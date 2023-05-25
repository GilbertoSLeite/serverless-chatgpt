"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_uid_1 = __importDefault(require("../../../../commons/generator-uid/generator-uid"));
class IndexSchema {
    constructor() {
        this.id = "";
        this.title = "";
        this.content = "";
    }
    async setTitleContent(title, content) {
        this.id = await IndexSchema.generatorUUID.generateId();
        this.title = title,
            this.content = content;
        return {
            id: this.id,
            title: this.title,
            content: this.content
        };
    }
}
IndexSchema.generatorUUID = new generator_uid_1.default();
exports.default = IndexSchema;
;
