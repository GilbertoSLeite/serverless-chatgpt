"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_feature_1 = __importDefault(require("../../../../commons/aws/aws-feature"));
const http_response_type_adapter_factory_1 = require("../../../../commons/http-response/http-response-type-adapter-factory");
const bucketName = process.env.BUCKET_AWS || 'default-bucket-name';
const key = process.env.KEY_AWS || 'default-key';
class RequestS3Document {
    constructor() {
        this.awsFeature = new aws_feature_1.default();
        this.httpResponse = new http_response_type_adapter_factory_1.HttpResponseTypeAdapterFactoryImplementation();
    }
    async requestS3Document() {
        try {
            const s3Client = await this.awsFeature.getS3Client().getObject({
                Bucket: bucketName,
                Key: key
            }).promise();
            const bodyData = s3Client.Body;
            return bodyData;
        }
        catch (error) {
            const { message } = error;
            const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
            return errorResponse;
        }
    }
}
exports.default = RequestS3Document;
