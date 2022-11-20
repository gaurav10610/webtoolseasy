import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
})
export class JwtComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    private clipboard: Clipboard,
    appIconService: AppIconService,
    private renderer: Renderer2
  ) {
    super(router, configService, contextService);
    this.contextService.setAppId('jwt');
    this.tags = <string[]>(
      this.configService.getApplicationTags(
        this.contextService.getCurrentAppId()
      )
    );
    this.jwtDecoder = new JwtHelperService();
    this.decodedToken = JSON.stringify(
      this.jwtDecoder.decodeToken(this.encodedToken),
      null,
      '    '
    );
  }

  isTokenValid: boolean = true;

  jwtDecoder: JwtHelperService;

  @ViewChild('encodedDiv', { static: false })
  encodedDiv!: ElementRef;

  @ViewChild('decodedDiv', { static: false })
  decodedDiv!: ElementRef;

  encodedToken: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM';

  decodedToken: string = '';

  ngOnInit(): void {
    LogUtils.info('jwt component has rendered');
  }

  ngAfterViewInit(): void {
    LogUtils.info('jwt component has rendered');
    this.updateEncodedToken(this.encodedToken);
    this.updateDecodedToken(this.decodedToken);
  }

  encodedInputChange(event: any) {
    LogUtils.info(
      `encoded token has changed with value: ${this.encodedDiv.nativeElement.innerText}`
    );
    this.decodeUpdatedToken(this.encodedDiv.nativeElement.innerText);
  }

  onTokenPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    LogUtils.info(`pasted data: ${pastedData}`);
    this.updateEncodedToken(pastedData);
    this.decodeUpdatedToken(pastedData);
  }

  decodeUpdatedToken(encodedTokenValue: string) {
    try {
      this.encodedToken = encodedTokenValue;
      const decodedTokenValue = this.jwtDecoder.decodeToken(encodedTokenValue);
      this.isTokenValid = true;
      this.decodedToken = JSON.stringify(decodedTokenValue, null, '    ');
      this.updateDecodedToken(this.decodedToken);
    } catch (error) {
      LogUtils.error(
        `error occured while decoding token: ${this.encodedToken}`
      );
      this.isTokenValid = false;
    }
  }

  updateEncodedToken(encodedToken: string) {
    this.renderer.setProperty(
      this.encodedDiv.nativeElement,
      'innerText',
      encodedToken
    );
  }

  updateDecodedToken(decodedToken: string) {
    this.renderer.setProperty(
      this.decodedDiv.nativeElement,
      'innerText',
      decodedToken
    );
  }

  copyDecodedToken() {
    this.clipboard.copy(this.decodedToken);
  }
}
