interface Result {
  errorMessage: string | null;
  key: string;
  statusCode: number;
  succeeded: boolean;
}

interface ModeledResult {
  id: string;
  inserido: boolean;
}

export default class TemplateResponseInsertDocument {
  public modelResults(results: Result[]): ModeledResult[] {
    return results.map((result) => ({
      id: result.key,
      inserido: result.succeeded,
    }));
  }
}
