import { Component } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/word-count/config';

@Component({
  selector: 'app-word-count',
  templateUrl: './word-count.component.html',
  styleUrls: ['./word-count.component.scss'],
})
export class WordCountComponent {
  wordCount: number = 0;
  characterCount: number = 0;
  sentenceCount: number = 0;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  onTextChange(event: any) {
    const textValue = event.target.value;
    if (textValue.trim() !== '') {
      this.characterCount = textValue.length;
      this.wordCount = textValue.trim().split(/\s+/).length;
      try {
        this.sentenceCount = textValue.match(/[\w|\)][.?!](\s|$)/g).length;
      } catch (err) {
        this.sentenceCount = 1;
      }
    } else {
      this.characterCount = 0;
      this.wordCount = 0;
      this.sentenceCount = 0;
    }
  }
}
