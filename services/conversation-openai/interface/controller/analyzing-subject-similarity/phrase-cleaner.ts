export default class PhraseCleaner {
  public cleanPhrase(phrase: string): string {
    return phrase.replace(/[\\"]/g, '');
  }
}