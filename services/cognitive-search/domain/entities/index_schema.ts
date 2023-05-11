import { format } from "date-fns";
import UuidGenerator from "../../../../commons/generator-uid/generator-uid";

export default class IndexSchema {
  id: string;
  title: string;
  content: string;

  private static generatorUUID = new UuidGenerator<string>();

  constructor() {
    this.id = ""
    this.title = "";
    this.content = "";
  }

  public async setTitleContent(title: string, content: object){
    this.id = await IndexSchema.generatorUUID.generateId(title);
    this.title = title,
    this.content = JSON.stringify(content, null, 2)
    return {
      id: this.id,
      title: this.title,
      content: this.content
    }
  }
};