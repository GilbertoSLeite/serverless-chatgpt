import { Configuration, OpenAIApi } from "openai";
import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../commons/http-response/http-response-type-adapter-factory";

interface Context {
  succeed: (response: any) => void;
}

const apiKey: string | undefined = process.env.OPENAI_API_KEY;
const basePath: string | undefined = process.env.BASE_PATH;
const apiVersion: string | undefined = process.env.API_VERSION;

export default class ConfigurationOpenai {

  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor(){
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }
  
  public async configureOpenia(promptPrefix: string, context: Context): Promise<any>{
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
        top_p: 0.5,
        frequency_penalty: 0.8,
        presence_penalty: 1,
        stop: ["\"\"\""],
      });
      if (completion.data && completion.data.choices) {
        const regex = /<\|im_end\|>/g;
        return completion.data.choices.map(choicesText => choicesText.text).join(' ').replace(regex, "");
      } else {
        const errorResponse = this.httpResponse.badRequestResponse().getResponse("Unexpected response format from OpenAI API.");
        return  context.succeed(errorResponse); 
      }
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return  context.succeed(errorResponse);         
    }
  }
};