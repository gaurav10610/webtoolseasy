import { Component } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-editor/config';

@Component({
  selector: 'app-js-editor',
  templateUrl: './js-editor.component.html',
  styleUrls: ['./js-editor.component.scss'],
})
export class JsEditorComponent {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;
}
