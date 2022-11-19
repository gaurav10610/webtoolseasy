import { Component, OnInit } from '@angular/core';
import { LogUtils } from 'src/app/service/util/logger';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
})
export class JwtComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    LogUtils.info('jwt component has rendered');
  }
}
