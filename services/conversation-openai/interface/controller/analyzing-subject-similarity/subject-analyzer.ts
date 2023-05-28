import ConvergentSubjectFinder from "./convergent-subject-finder";

interface Context {
  succeed: (response: any) => void;
}

export default class SubjectAnalyzer {
  public async findConvergentSubjects(array: string[], lastPhrase: string, context: Context): Promise<any> {
    const convergentSubjectFinder = new ConvergentSubjectFinder();

    return convergentSubjectFinder.findConvergentSubjects(array, lastPhrase, context);
  }
}