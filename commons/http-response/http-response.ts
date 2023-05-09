class Response {
  public statusCode: number;

  public static readonly headers: { [header: string]: boolean | number | string } = { 'Content-Type': 'application/json' };

  public body: boolean | number | string;

  constructor(statusCode: number, body: boolean | number | string) {
    this.statusCode = statusCode;
    this.body = body;
  }
}

export default Response;
