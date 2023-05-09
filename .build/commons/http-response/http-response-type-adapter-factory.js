"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponseTypeAdapterFactoryImplementation = void 0;
const bad_request_response_1 = require("./http-response-types/bad-request-response");
const forbidden_response_1 = require("./http-response-types/forbidden-response");
const internal_server_error_response_1 = require("./http-response-types/internal-server-error-response");
const not_found_response_1 = require("./http-response-types/not-found-response");
const ok_response_1 = require("./http-response-types/ok-response");
class HttpResponseTypeAdapterFactoryImplementation {
    badRequestResponse() {
        return new bad_request_response_1.BadRequestResponse();
    }
    notFoundResponse() {
        return new not_found_response_1.NotFoundResponse();
    }
    forbiddenResponse() {
        return new forbidden_response_1.ForbiddenResponse();
    }
    internalServerErrorResponse() {
        return new internal_server_error_response_1.InternalServerErrorResponse();
    }
    successResponse() {
        return new ok_response_1.OkResponse();
    }
}
exports.HttpResponseTypeAdapterFactoryImplementation = HttpResponseTypeAdapterFactoryImplementation;
