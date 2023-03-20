export default class CustomReponse {
  message: string;
  requestStaus: boolean;
  stack?: string;

  constructor(message: string , stack?: string) {
    this.message = message;
    this.requestStaus = false;
    this.stack = stack;
  }
  
}
