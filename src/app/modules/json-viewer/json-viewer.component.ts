import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { descriptionData } from 'src/environments/component-config/json-viewer/config';
import { componentConfig } from 'src/environments/component-config/json-viewer/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgxJsonViewerComponent } from 'ngx-json-viewer';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
})
export class JsonViewerComponent implements AfterViewInit {
  isJsonValid: boolean = true;

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: NgxJsonViewerComponent;

  rawJson: string = `{"role":"admin","issuer":"online json viewer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  tabSpaceValue: string = '   ';
  formattedJSON = JSON.parse(this.rawJson);

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private clipboard: Clipboard
  ) {}

  ngAfterViewInit(): void {
    this.updateRawJson(this.rawJson);
  }

  rawJsonChange() {
    this.formatJson(this.text1AreaContent.nativeElement.innerText);
  }

  onJsonPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateRawJson(pastedData);
    this.formatJson(pastedData);
  }

  formatJson(rawJsonValue: string) {
    try {
      this.rawJson = rawJsonValue;
      this.isJsonValid = true;
      this.updateJsonTree(rawJsonValue);
    } catch (error) {
      this.isJsonValid = false;
    }
  }

  updateRawJson(rawJson: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      rawJson
    );
  }

  updateJsonTree(formattedJson: string) {
    this.formattedJSON = JSON.parse(formattedJson);
    this.document.getElementsByTagName('ngx-json-viewer')[0].firstChild.style[
      'overflow-y'
    ] = 'scroll';
  }

  copyFormattedJson() {
    this.clipboard.copy(
      JSON.stringify(this.text2AreaContent.json, null, this.tabSpaceValue)
    );
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
