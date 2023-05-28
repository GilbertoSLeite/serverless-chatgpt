import { HttpResponseTypeAdapterFactoryImplementation } from "../../../../../commons/http-response/http-response-type-adapter-factory";
import { loggerDependencies } from "../../../../../commons/structure-logger/logger-entry-interface";
import { InfoLogger } from "../../../../../commons/structure-logger/logger/info-logger";
import PhraseCleaner from "./phrase-cleaner";
import SimilarityChecker from "./similarity-checker";

const logger = new InfoLogger(loggerDependencies);

interface Context {
  succeed: (response: any) => void;
}

export default class ConvergentSubjectFinder {
  private similarityChecker: SimilarityChecker;
  private phraseCleaner: PhraseCleaner;
  private httpResponse: HttpResponseTypeAdapterFactoryImplementation;

  constructor() {
    this.similarityChecker = new SimilarityChecker();
    this.phraseCleaner = new PhraseCleaner();
    this.httpResponse = new HttpResponseTypeAdapterFactoryImplementation();
  }

  public async findConvergentSubjects(array: string[], lastPhrase: string, context: Context): Promise<string | object | void> {
    try {
      const cleanedArray = this.cleanArray(array);
      const convergentSubjects = this.findConvergentPhrases(cleanedArray, lastPhrase);
  
      return convergentSubjects.join(', ');      
    } catch (error: any) {
      const { message } = error;
      const errorResponse = this.httpResponse.internalServerErrorResponse().getResponse(message);
      return context.succeed(errorResponse);      
    }
  }

  private cleanArray(array: string[]): string[] {
    const cleanedArray = array.map(phrase => this.phraseCleaner.cleanPhrase(phrase.toLocaleLowerCase()));
    return this.getLastSixPhrases(cleanedArray);
  }

  private getLastSixPhrases(array: string[]): string[] {
    if (array.length <= 6) {
      return array;
    }
    return array.slice(-6);
  }

  private findConvergentPhrases(array: string[], lastPhrase: string): string[] {
    const convergentSubjects: string[] = [lastPhrase.toLocaleLowerCase()];
    const similarityThreshold = 0.6;

    for (const phrase1 of array) {
      for (const phrase2 of array) {
        if (phrase1.toLocaleLowerCase() === phrase2.toLocaleLowerCase()) {
          continue;
        }

        const similarityScore = this.similarityChecker.compareStrings(phrase1.toLocaleLowerCase(), phrase2.toLocaleLowerCase());
        logger.infoLogger('convergent-subject-finder.ts', 'Similaridade entre as palavras', 'chatGPT', { valorSimilaridade: similarityScore, primeiraPalavra: phrase1, segundaPalavra: phrase2 });
        if (similarityScore > similarityThreshold) {
          if (!convergentSubjects.includes(phrase1)) {
            convergentSubjects.push(phrase1.toLocaleLowerCase());
          }
          if (!convergentSubjects.includes(phrase2)) {
            convergentSubjects.push(phrase2.toLocaleLowerCase());
          }
        }
      }
    }

    return convergentSubjects;
  }
}
