import * as natural from 'natural';

export default class SimilarityChecker {
  public compareStrings(string1: string, string2: string): number {
    const options =  {}
    return natural.JaroWinklerDistance(string1, string2, options);
  }
}