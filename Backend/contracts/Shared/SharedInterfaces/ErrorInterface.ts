export default interface ApiError {
  message: string;
  [key: string]: any;
}

export const isAnError = (typeToCheck: any): typeToCheck is ApiError =>
  (typeToCheck as ApiError).message !== undefined;
