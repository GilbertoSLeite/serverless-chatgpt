export default interface ApiRequestConfig {
  url: string;
  method: string;
  headers?: Record<string, string | number | boolean>;
  params?: any;
}