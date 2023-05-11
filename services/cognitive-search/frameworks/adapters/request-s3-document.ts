import AwsFeature from "../../../../commons/aws/aws-feature";
import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

const bucketName = process.env.BUCKET_AWS || 'default-bucket-name';
const key = process.env.KEY_AWS || 'default-key';

export default class RequestS3Document {
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private awsFeature: AwsFeature;

  constructor(){
    this.awsFeature = new AwsFeature();
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async requestS3Document(): Promise<any>{
    try {
      const s3Client = await this.awsFeature.getS3Client().getObject({ 
        Bucket: bucketName, 
        Key: key 
      }).promise();
      const bodyData = s3Client.Body;
      return bodyData;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;         
    }
  }
}