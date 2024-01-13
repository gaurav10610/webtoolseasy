import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from 'src/app/service/app-cache/app-cache.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApplicationIds } from 'src/environments/tools-directory-config';
import { AppContext, ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/text-editor/config';
import { environment } from 'src/environments/environment';
import { ApplicationState } from 'src/app/@types/component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements ApplicationState {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  rawCode: string = 'this is online text editor';

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'text/plain',
    fontSize: 15,
  };

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    private appCacheService: AppCacheService,
    private clipboard: Clipboard,
    private route: ActivatedRoute
  ) {
    this.restoreState();

    if (this.route.snapshot.queryParams['text']) {
      this.rawCode = decodeURIComponent(
        this.route.snapshot.queryParams['text']
      );
    }
  }

  async saveState(): Promise<void> {
    this.appCacheService.setAppContext({
      id: ApplicationIds.TEXT_EDITOR,
      data: {
        text: this.rawCode,
        editorOptions: this.editorOptions,
      },
    });
  }

  restoreState(): void {
    const appContext: AppContext | null = this.appCacheService.getAppContext(
      ApplicationIds.TEXT_EDITOR
    );

    if (appContext && appContext.data) {
      const { text, editorOptions } = appContext.data;
      this.rawCode = text;
      this.editorOptions = { ...editorOptions };
    }
  }

  onRawCodeChange(updatedModel: string) {
    this.rawCode = updatedModel;
    this.saveState();
  }

  /**
   * handle config change event
   * @param changeEvent
   * @param configName
   */
  handleConfigChange(changeEvent: any, configName: string) {
    switch (configName) {
      case 'theme':
        this.editorOptions = {
          ...this.editorOptions,
          theme: changeEvent.value,
        };
        break;

      case 'fontSize':
        this.editorOptions = {
          ...this.editorOptions,
          fontSize: changeEvent.target.value,
        };
        break;
    }
    this.saveState();
  }

  copyShareableLink() {
    this.clipboard.copy(
      `${environment.hostname}${
        this.applicationConfig.navigationUrl
      }?text=${encodeURIComponent(this.rawCode)}`
    );
  }

  copyText() {
    this.clipboard.copy(this.rawCode);
  }
}
