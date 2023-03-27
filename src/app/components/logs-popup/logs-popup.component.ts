import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogUtils } from 'src/app/service/util/logger';

@Component({
  selector: 'app-logs-popup',
  templateUrl: './logs-popup.component.html',
  styleUrls: ['./logs-popup.component.scss'],
})
export class LogsPopupComponent {
  logList: string[];

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: string[]
  ) {
    LogUtils.info(data);
    this.logList = data;
  }
}
