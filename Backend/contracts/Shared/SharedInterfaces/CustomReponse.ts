export class CustomReponse {
  message: string;
  requestStaus: Boolean;

  constructor(message: string) {
    this.message = message;
    this.requestStaus = false;
  }
}
