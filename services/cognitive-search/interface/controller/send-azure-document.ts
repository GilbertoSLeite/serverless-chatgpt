import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";
import TextCleaner from "../../application/use-cases/clean-text";
import DefineSchemaIndexers from "../../application/use-cases/define-schema-of-indexers";
import SendingIndexCognitiveSearch from "../../application/use-cases/sending-index-cognitive-search";
import SplitDocChunk from "../../application/use-cases/split-doc-chunk";
import DownloadConvertPDFToTxt from "./download-convert-pdf-to-txt";

export default class SendAzureDocument {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;
  private downloadConvertPDFtoText: DownloadConvertPDFToTxt;
  private splitDocChunk: SplitDocChunk;
  private defineSchemaIndexers: DefineSchemaIndexers;
  private updloadIndexToCognitive: SendingIndexCognitiveSearch;
  private textClean: TextCleaner;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
    this.downloadConvertPDFtoText = new DownloadConvertPDFToTxt();
    this.splitDocChunk = new SplitDocChunk();
    this.defineSchemaIndexers = new DefineSchemaIndexers();
    this.updloadIndexToCognitive = new SendingIndexCognitiveSearch();
    this.textClean = new TextCleaner();
  }

  public async sendAzureDocument(filePath: string): Promise<any>{
    try {
      const docsConverted = await this.downloadConvertPDFtoText.downloadConvertPdfToTxt(filePath);
      const docsInChunk = await this.splitDocChunk.splicDocChunk(docsConverted);
      const pageContentClean = await this.textClean.removeSpecialCharacters(docsInChunk);
      const entitiesIndexChunks: any = await this.defineSchemaIndexers.defineSchemaIndexers(pageContentClean);
      const sentDocsToCognitive: any = await this.updloadIndexToCognitive.sedingIndexCognitiveSearch(entitiesIndexChunks);
      return sentDocsToCognitive;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;   
    }
  }

}