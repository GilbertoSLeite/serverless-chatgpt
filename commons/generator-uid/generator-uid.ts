import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export default class UuidGenerator<T>{
  public async generateId(param: T): Promise<string> {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
    const uuid = uuidv4();
    return `${timestamp}_${param}_${uuid}`;
  }
}
