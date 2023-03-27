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
import { JwtHelperService } from '@auth0/angular-jwt';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { jwt as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
})
export class JwtComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'jwt';
  isTokenValid: boolean = true;
  jwtDecoder: JwtHelperService | undefined;
  tabSpaceValue: string = '  ';

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: ElementRef;

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
  }

  ngOnInit(): void {
    LogUtils.info('jwt component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('jwt component: ngAfterViewInit');
    this.jwtDecoder = new JwtHelperService();
    const decodedToken = JSON.stringify(
      this.jwtDecoder.decodeToken(this.encodedToken),
      null,
      this.tabSpaceValue
    );
    this.updateEncodedToken(this.encodedToken);
    this.updateDecodedToken(decodedToken);
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
      const decodedTokenValue = this.jwtDecoder!.decodeToken(encodedTokenValue);
      this.isTokenValid = true;
      const decodedToken = JSON.stringify(
        decodedTokenValue,
        null,
        this.tabSpaceValue
      );
      this.updateDecodedToken(decodedToken);
    } catch (error) {
      LogUtils.error(
        `error occured while decoding token: ${this.encodedToken}`
      );
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

  updateDecodedToken(decodedToken: string) {
    this.renderer.setProperty(
      this.text2AreaContent.nativeElement,
      'innerText',
      decodedToken
    );
  }

  copyDecodedToken() {
    this.clipboard.copy(this.text2AreaContent.nativeElement.innerText);
  }
}
