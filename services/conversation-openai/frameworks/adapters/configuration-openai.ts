import { Configuration, OpenAIApi } from "openai";
import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

const apiKey: string | undefined = process.env.OPENAI_API_KEY;
const basePath: string | undefined = process.env.BASE_PATH;
const apiVersion: string | undefined = process.env.API_VERSION;

export default class ConfigurationOpenai {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }
  
  public async configureOpenia(promptPrefix: string): Promise<any>{
    try {
      const configuration = new Configuration({
        apiKey,
        basePath,
        baseOptions: {
          headers: {
            'api-key': apiKey
          },
          params: {
            'api-version': apiVersion // this might change. I got the current value from the sample code at https://oai.azure.com/portal/chat
          }
        }
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: 'gpt-35-turbo',
        prompt: promptPrefix,
        temperature: 0,
        max_tokens: 350,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });
      const regex = /<\|im_end\|>/g;
      return completion.data.choices.map(choicesText => choicesText.text).join(' ').replace(regex, "");;
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return errorResponse;         
    }
  }
};