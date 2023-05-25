export default class TextCleaner {
  public async removeSpecialCharacters(texto: string[]): Promise<string[]> {
    const cleanText = texto.map((text) => text.replace(/\n/g, ' ').replace(/\s+/g, ' ')); 
   
    return cleanText;
  }
}