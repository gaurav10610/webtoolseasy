import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent extends BaseComponent implements OnInit {
  constructor(router: Router, configService: ConfigService) {
    super(router, configService);
  }

  ngOnInit(): void {}
}
