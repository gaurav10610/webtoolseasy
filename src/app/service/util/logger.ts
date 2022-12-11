import { environment } from 'src/environments/environment';

export class LogUtils {
  static info(message: any) {
    if (!environment.production) {
      console.log(message);
    }
  }

  static debug(message: any) {
    if (!environment.production) {
      console.log(message);
    }
  }

  static error(message: any) {
    console.log(message);
  }
}
