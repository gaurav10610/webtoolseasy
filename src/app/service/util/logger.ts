import { environment } from 'src/environments/environment';

export class LogUtils {
  static info(message: any, ...optionalParams: any[]) {
    if (!environment.production) {
      if (optionalParams.length > 0) console.info(message, optionalParams);
      else console.info(message);
    }
  }

  static debug(message: any, ...optionalParams: any[]) {
    if (!environment.production) {
      if (optionalParams.length > 0) console.debug(message, optionalParams);
      else console.debug(message);
    }
  }

  static error(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) console.error(message, optionalParams);
    else console.error(message);
  }
}
