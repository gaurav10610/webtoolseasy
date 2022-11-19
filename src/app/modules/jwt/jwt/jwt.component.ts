import { Component, OnInit } from '@angular/core';
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
export class JwtComponent extends BaseComponent implements OnInit {
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    private clipboard: Clipboard,
    appIconService: AppIconService
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

  encodedToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  decodedToken: string = '';
  jwtDecoder: JwtHelperService;

  ngOnInit(): void {
    LogUtils.info('jwt component has rendered');
  }

  encodedInputChange(event: any) {
    LogUtils.info(`encoded token has changed`);
    this.encodedToken = event.target.value;
    try {
      const decodedTokenValue = this.jwtDecoder.decodeToken(this.encodedToken);
      this.isTokenValid = true;
      this.decodedToken = JSON.stringify(decodedTokenValue, null, '    ');
    } catch (error) {
      LogUtils.error(
        `error occured while decoding token: ${this.encodedToken}`
      );
      this.decodedToken = 'encoded token is invalid';
      this.isTokenValid = false;
    }
  }

  copyDecodedToken() {
    this.clipboard.copy(this.decodedToken);
  }
}
