import { environment } from 'src/environments/environment';

export class LogUtils {
  static info(message: any, ...optionalParams: any[]) {
    if (!environment.production) {
      console.info(message, optionalParams);
    }
  }

  static debug(message: any, ...optionalParams: any[]) {
    if (!environment.production) {
      console.debug(message, optionalParams);
    }
  }

  static error(message: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
  }
}
