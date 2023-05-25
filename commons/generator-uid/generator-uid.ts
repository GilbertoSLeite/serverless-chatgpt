import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const client = process.env.SEARCH_INDEX_NAME || 'zenvia'

export default class UuidGenerator<T>{
  public async generateId(): Promise<string> {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
    const uuid = uuidv4();
    const idString = JSON.stringify({
      clientName: client,
      timestamp,
      uuid
    })
    const idBase64 = Buffer.from(idString).toString('base64');
    return idBase64;
  }
}
