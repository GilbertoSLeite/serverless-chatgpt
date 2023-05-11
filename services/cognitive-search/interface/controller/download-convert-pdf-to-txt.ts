import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import ConvertPdfToTxt from "../../application/use-cases/convert-pdf-txt";
import DefineSchemaIndexers from "../../application/use-cases/define-schema-of-indexers";
import SendingIndexCognitiveSearch from "../../application/use-cases/sending-index-cognitive-search";
import SplitDocChunk from "../../application/use-cases/split-doc-chunk";
import ConfigurationOpenai from "../../../conversation-openai/frameworks/adapters/configuration-openai";
import RequestHTTPDocument from "../../frameworks/adapters/request-http-document";
import RequestS3Document from "../../frameworks/adapters/request-s3-document";
import TemplateResponseInsertDocument from "../models/template-response-insert-document";

const filePath: string = process.env.LOCAL_DOCS || '';

export default class DownloadConvertPDFToTxt {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private requestS3Document: RequestS3Document;
  private convertPdfTxt: ConvertPdfToTxt;
  private requestHttpDocunt: RequestHTTPDocument;
  private configurationOpenai: ConfigurationOpenai;
  private splitDocChunk: SplitDocChunk;
  private defineSchemaIndexers: DefineSchemaIndexers;
  private updloadIndexToCognitive: SendingIndexCognitiveSearch;
  private templateResponseInsertDocument: TemplateResponseInsertDocument;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.requestS3Document = new RequestS3Document();
    this.requestHttpDocunt = new RequestHTTPDocument();
    this.convertPdfTxt = new ConvertPdfToTxt();
    this.configurationOpenai = new ConfigurationOpenai();
    this.splitDocChunk = new SplitDocChunk();
    this.defineSchemaIndexers = new DefineSchemaIndexers();
    this.updloadIndexToCognitive = new SendingIndexCognitiveSearch();
    this.templateResponseInsertDocument = new TemplateResponseInsertDocument();
  }

  public async downloadConvertPdfToTxt(): Promise<any>{
    try {
      // const downloadPdf = await this.requestHttpDocunt.requestHttpDocument();
      // if(!downloadPdf) return this.httpResponse.notFoundResponse().getResponse('Arquivo Não Encontrado');
      const docsConverted = await this.convertPdfTxt.convertPdfToTxt(filePath);
      const docsInChunk: any = await this.splitDocChunk.splicDocChunk(docsConverted);
      const entitiesIndexChunks: any = await this.defineSchemaIndexers.defineSchemaIndexers(docsInChunk);
      const sentDocsToCognitive: any = await this.updloadIndexToCognitive.sedingIndexCognitiveSearch(entitiesIndexChunks);
      return sentDocsToCognitive;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;        
    }
  };
};