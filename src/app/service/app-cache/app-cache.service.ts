import { Injectable } from '@angular/core';
import { AppContext } from 'src/app/@types/config';
import { ApplicationIds } from 'src/environments/tools-directory-config';
import { PlatformMetadataService } from '../platform-metadata/platform-metadata.service';

@Injectable({
  providedIn: 'root',
})
export class AppCacheService {
  constructor(private platformService: PlatformMetadataService) {}
  /**
   * store app context in browser's local storage
   * @param appContext
   */
  public async setAppContext(appContext: AppContext): Promise<void> {
    localStorage.setItem(appContext.id, JSON.stringify(appContext));
  }

  /**
   * retrieve app context from browser's local storage
   * @param id
   * @returns
   */
  public getAppContext(id: ApplicationIds): AppContext | null {
    if (this.platformService.isPlatformBrowser) {
      return localStorage.getItem(id)
        ? <AppContext>JSON.parse(localStorage.getItem(id)!)
        : null;
    }
    return null;
  }
}
