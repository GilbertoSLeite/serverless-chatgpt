"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const http_response_type_adapter_factory_1 = require("../../commons/http-response/http-response-type-adapter-factory");
const identify_last_talk_1 = __importDefault(require("./interface/controller/identify-last-talk"));
const httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
const identifyLastTalk = new identify_last_talk_1.default();
const handler = async (event, context) => {
    try {
        const { queryStringParameters } = event;
        const response = identifyLastTalk.identifyLastTalk(queryStringParameters, context);
        return httpResponse.successResponse().getResponse(JSON.stringify(response));
    }
    catch (error) {
        const { message } = error;
        return httpResponse.internalServerErrorResponse().getResponse(message);
    }
    ;
};
exports.handler = handler;
