export default interface StatusResponse {
  [status: number]: (errorMessage: string) => object;
}