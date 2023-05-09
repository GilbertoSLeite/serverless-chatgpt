import * as AWS from 'aws-sdk';
import * as configAws from './config-aws' ;

class AwsFeature {
  private s3Client: AWS.S3;

  constructor() {
    this.s3Client = new AWS.S3({ region: configAws.default.region });
  }

  public getS3Client(): AWS.S3 {
    return this.s3Client;
  }
}

export default AwsFeature;
