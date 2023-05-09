import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import ConvertPdfToTxt from "../../application/use-cases/convert-pdf-txt";
import SplitDocChunk from "../../application/use-cases/split-doc-chunk";
import ConfigurationOpenai from "../../frameworks/adapters/configuration-openai";
import RequestHTTPDocument from "../../frameworks/adapters/request-http-document";
import RequestS3Document from "../../frameworks/adapters/request-s3-document";

const filePath: string = process.env.LOCAL_DOCS || '';

export default class DownloadConvertPDFToTxt {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  private requestS3Document: RequestS3Document;

  private convertPdfTxt: ConvertPdfToTxt;

  private requestHttpDocunt: RequestHTTPDocument;

  private configurationOpenai: ConfigurationOpenai;

  private splitDocChunk: SplitDocChunk;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.requestS3Document = new RequestS3Document();
    this.requestHttpDocunt = new RequestHTTPDocument();
    this.convertPdfTxt = new ConvertPdfToTxt();
    this.configurationOpenai = new ConfigurationOpenai();
    this.splitDocChunk = new SplitDocChunk();
  }

  public async downloadConvertPdfToTxt(): Promise<any>{
    try {
      // const downloadPdf = await this.requestHttpDocunt.requestHttpDocument();
      // if(!downloadPdf) return this.httpResponse.notFoundResponse().getResponse('Arquivo Não Encontrado');
      const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
      const docsInTxt = this.splitDocChunk.splicDocChunk(docsConverted);
      return docsInTxt;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  };
};