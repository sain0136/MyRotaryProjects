import type {IResizeImageOptions} from '../../frontend/interfaces/Frontend'

export default class Utilities {
    
    /**
     * @description This function is used to check if an error is an exception
     * @param  {any} error
     * @returns boolean
     */
    public static isAnException(error: object): boolean {
      if ('stack' in error) return true
      else return false  
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
