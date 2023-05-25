import * as similarity from 'string-similarity';

export default class SubjectAnalyzer {
  public async findConvergentSubjects(array: string[], lastPhrase: string): Promise<string> {    
    const regex = /[\\"]/g;
    let assuntosConvergentes: string[] = [];
    assuntosConvergentes.push(lastPhrase);

    for (const frase1 of array) {
      for (const frase2 of array) {
        if (frase1.replace(regex, '') === frase2.replace(regex, '')) {
          continue;
        }

        const similaridade = similarity.compareTwoStrings(frase1.replace(regex, ''), frase2.replace(regex, ''));
        if (similaridade > 0.8) {  
          if (!assuntosConvergentes.includes(frase1.replace(regex, ''))) {
            assuntosConvergentes.push(frase1.replace(regex, ''));
          }
          if (!assuntosConvergentes.includes(frase2.replace(regex, ''))) {
            assuntosConvergentes.push(frase2.replace(regex, ''));
          }
        }
      }
    }
    return assuntosConvergentes.join(', ');
  }
}


