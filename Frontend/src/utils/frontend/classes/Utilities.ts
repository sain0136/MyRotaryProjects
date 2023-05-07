import { useRotaryStore } from "@/stores/rotaryStore";
import {
  ErrorMessages,
  type IResizeImageOptions,
} from "@/utils/frontend/interfaces/Frontend";

export default class Utilities {
      
  public static logoutTimedOutUser = async () => {
    useRotaryStore().$state.showLogoutModal = true;
    useRotaryStore().signOut();
  };

  /**
   * @param  {any} v$
   * @returns string
   */
  public static passwordValidatonMessage(v$: any): string {
    let message = ""; //"ErrorMessages.REQURIED_FIELD"";
    (v$.password.$errors as []).forEach((element: any) => {
      if (element.$uid === "password-required") {
        message = ErrorMessages.REQURIED_FIELD;
        return;
      }
      if (element.$uid === "password-minLength") {
        message = ErrorMessages.PASSWORD_MIN_LENGTH;
        return;
      }
    });

    return message;
  }

  public static uncapitalize(str: string): string {
    return str.charAt(0) + str.slice(1).toLowerCase();
  }

  public static headerFormater(str: string): string {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  /**
   * @description This function is used to get the validation message for a field
   * @param  {any} v$
   * @returns string
   */
  public static emailValidatonMessage(v$: any): string {
    let message = ""; //"ErrorMessages.REQURIED_FIELD"";
    (v$.email.$errors as []).forEach((element: any) => {
      if (element.$uid === "email-required") {
        message = ErrorMessages.REQURIED_FIELD;
        return;
      }
      if (element.$uid === "email-email") {
        message = ErrorMessages.INVALID_EMAIL;
        return;
      }
    });
    return message;
  }

  /**
   * @description This function is used to check if an error is an exception
   * @param  {any} error
   * @returns boolean
   */
  public static isAnException(error: object): boolean {
    if (typeof error !== "object") {
      return false;
    }
    if ("stack" in error) return true;
    else return false;
  }

  /**
   * @description This function is used to check if an error is an api error
   * @param  {object} error
   * @returns boolean
   */
  public static isAnApiError(error: object | boolean | number): boolean {
    if (typeof error !== "object") {
      return false;
    }
    if ("message" in error) return true;
    else return false;
  }

  /**
   * @description This function is used to resize an image
   * @param  {IResizeImageOptions} settings
   * @returns Promise
   */
  static resizeImage(settings: IResizeImageOptions): Promise<unknown> {
    const file = settings.file;
    const maxSize = settings.maxSize;
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement("canvas");
    const dataURItoBlob = (dataURI: string) => {
      const bytes =
        dataURI.split(",")[0].indexOf("base64") >= 0
          ? atob(dataURI.split(",")[1])
          : (<any>window).unescape(dataURI.split(",")[1]);
      const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const max = bytes.length;
      const ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], { type: mime });
    };
    const resize = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let aq = canvas.getContext("2d") as CanvasRenderingContext2D;
      aq.drawImage(image, 0, 0, width, height);
      let dataUrl = canvas.toDataURL("image/jpeg");
      return dataURItoBlob(dataUrl);
    };
    return new Promise((ok, no) => {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }
      reader.onload = (readerEvent: any) => {
        image.onload = () => ok(resize());
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}
