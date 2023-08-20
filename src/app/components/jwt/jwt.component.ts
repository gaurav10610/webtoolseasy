import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/jwt/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { decodeJwt, decodeProtectedHeader } from 'jose';
import { NgxJsonViewerComponent } from 'ngx-json-viewer';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
})
export class JwtComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
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

  constructor(
    private clipboard: Clipboard,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.descrptionData = descriptionData;
    this.appContextService.relatedTools = componentConfig.relatedTools;

    this.decodedToken = decodeJwt(this.encodedToken);

    /**
     * decoded JWT token headers
     */
    this.decodedHeaders = decodeProtectedHeader(this.encodedToken);
  }

  ngOnInit(): void {
    LogUtils.info('jwt component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('jwt component: ngAfterViewInit');
    this.updateEncodedToken(this.encodedToken);
  }

  encodedInputChange() {
    this.decodeUpdatedToken(this.text1AreaContent.nativeElement.innerText);
  }

  onTokenPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateEncodedToken(pastedData);
    this.decodeUpdatedToken(pastedData);
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
