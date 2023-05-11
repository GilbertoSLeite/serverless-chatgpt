"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const index_schema_1 = __importDefault(require("../../domain/entities/index_schema"));
class DefineSchemaIndexers {
    constructor() {
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
        this.indexSchema = new index_schema_1.default();
    }
    async defineSchemaIndexers(documentFormatText) {
        try {
            const arrayPromise = [];
            for (const iteratorDocument of documentFormatText) {
                const promisesIndexSchema = this.indexSchema.setTitleContent('Bradesco', iteratorDocument);
                arrayPromise.push(promisesIndexSchema);
            }
            const entityIndexers = await Promise.all(arrayPromise);
            return entityIndexers;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = DefineSchemaIndexers;
