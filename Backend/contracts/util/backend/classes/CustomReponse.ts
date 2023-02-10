export default class CustomReponse {
  message: string;
  requestStaus: boolean;
  constructor(message: string) {
    this.message = message;
    this.requestStaus = false;
  }
}
