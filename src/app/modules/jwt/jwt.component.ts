import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/jwt/config';
import { decodeJwt, decodeProtectedHeader } from 'jose';
import { NgxJsonViewerComponent } from 'ngx-json-viewer';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
})
export class JwtComponent implements AfterViewInit {
  isTokenValid: boolean = true;
  tabSpaceValue: string = '  ';

  /**
   * encoded token
   */
  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  /**
   * decoded token
   */
  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: NgxJsonViewerComponent;

  /**
   * token header
   */
  @ViewChild('text3AreaContent', { static: false })
  text3AreaContent!: NgxJsonViewerComponent;

  decodedHeaders: any;
  decodedToken: any;

  encodedToken: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM';

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    private renderer: Renderer2
  ) {
    this.decodedToken = decodeJwt(this.encodedToken);

    /**
     * decoded JWT token headers
     */
    this.decodedHeaders = decodeProtectedHeader(this.encodedToken);
  }

  ngAfterViewInit(): void {
    this.updateEncodedToken(this.encodedToken);
  }

  encodedInputChange() {
    this.decodeUpdatedToken(this.text1AreaContent.nativeElement.innerText);
  }

  decodeUpdatedToken(encodedTokenValue: string) {
    try {
      this.encodedToken = encodedTokenValue;

      /**
       * decoded JWT token
       */
      const decodedTokenValue = decodeJwt(encodedTokenValue);

      /**
       * decoded JWT token headers
       */
      const tokenHeadersValue = decodeProtectedHeader(encodedTokenValue);
      this.isTokenValid = true;

      this.updateDecodedToken(decodedTokenValue);
      this.updateTokenHeaders(tokenHeadersValue);
    } catch (error) {
      LogUtils.error(
        `error occured while decoding token: ${this.encodedToken}`
      );
      LogUtils.error(error);
      this.isTokenValid = false;
    }
  }

  updateEncodedToken(encodedToken: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      encodedToken
    );
  }

  updateDecodedToken(decodedToken: any) {
    this.decodedToken = decodedToken;
  }

  updateTokenHeaders(tokeanHeaders: any) {
    this.decodedHeaders = tokeanHeaders;
  }

  copyDecodedToken() {
    this.clipboard.copy(
      JSON.stringify(this.text2AreaContent.json, null, this.tabSpaceValue)
    );
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
