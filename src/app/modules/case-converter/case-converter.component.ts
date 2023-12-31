import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/case-converter/config';

@Component({
  selector: 'app-case-converter',
  templateUrl: './case-converter.component.html',
  styleUrls: ['./case-converter.component.scss'],
})
export class CaseConverterComponent {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  textInput = new FormControl(
    'WebToolsEasy is Awesome. Explore Free Web Tools.'
  );

  toUpperCase() {
    if (this.textInput.value) {
      this.textInput.setValue(this.textInput.value?.toUpperCase());
    }
  }

  toLowerCase() {
    if (this.textInput.value) {
      this.textInput.setValue(this.textInput.value.toLowerCase());
    }
  }

  clearText() {
    if (this.textInput.value) {
      this.textInput.setValue('');
    }
  }
}
