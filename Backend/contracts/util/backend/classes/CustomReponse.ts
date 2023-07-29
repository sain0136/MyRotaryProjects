export default class CustomReponse {
  message: string;
  requestStaus: boolean;
  stack?: string;
  code?: string | number;
  majorSqlError?: boolean;

  constructor(message: string , stack?: string, code?: string | number) {
    this.message = message;
    this.requestStaus = false;
    this.stack = stack;
    this.code = code;
  }
  
}
