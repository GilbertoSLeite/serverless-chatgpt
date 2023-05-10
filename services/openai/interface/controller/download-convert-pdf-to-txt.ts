import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import ConvertPdfToTxt from "../../application/use-cases/convert-pdf-txt";
import DefineSchemaIndexers from "../../application/use-cases/define-schema-of-indexers";
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
  private defineSchemaIndexers: DefineSchemaIndexers;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.requestS3Document = new RequestS3Document();
    this.requestHttpDocunt = new RequestHTTPDocument();
    this.convertPdfTxt = new ConvertPdfToTxt();
    this.configurationOpenai = new ConfigurationOpenai();
    this.splitDocChunk = new SplitDocChunk();
    this.defineSchemaIndexers = new DefineSchemaIndexers();
  }

  public async downloadConvertPdfToTxt(): Promise<any>{
    try {
      // const downloadPdf = await this.requestHttpDocunt.requestHttpDocument();
      // if(!downloadPdf) return this.httpResponse.notFoundResponse().getResponse('Arquivo Não Encontrado');
      const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
      const docsInTxt: any = await this.splitDocChunk.splicDocChunk(docsConverted);
      const entitiesIndexChunks = await this.defineSchemaIndexers.defineSchemaIndexers(docsInTxt)      
      return entitiesIndexChunks;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  };
};