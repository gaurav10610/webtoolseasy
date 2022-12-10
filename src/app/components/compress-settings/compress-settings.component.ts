import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { FileData, ImageCompressSettings } from 'src/app/@types/file';
import { LogUtils } from 'src/app/service/util/logger';

@Component({
  selector: 'app-compress-settings',
  templateUrl: './compress-settings.component.html',
  styleUrls: ['./compress-settings.component.scss'],
})
export class CompressSettingsComponent implements OnInit {
  compressionRate: number = 10;
  maxFileSize: number;
  oldFileSize: number;
  fileId: string;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: FileData
  ) {
    this.maxFileSize = data.maxFileSize;
    this.oldFileSize = data.file.size;
    this.fileId = data.id;
  }

  ngOnInit(): void {
    LogUtils.info('compression settings component has been rendered');
  }

  onCompressionRateChange(event: MatSliderChange) {
    this.compressionRate = event.value!;
    const compressionRatio: number = 100 - event.value!;
    this.maxFileSize = (compressionRatio / 100) * this.oldFileSize;
  }

  /**
   * format size in to higher terms
   * @param bytes
   * @param decimals
   * @returns
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k: number = 1024;
    const dm: number = decimals < 0 ? 0 : decimals;
    const sizes: string[] = [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  applySettings() {
    const imageCompressSettings: ImageCompressSettings = {
      fileId: this.fileId,
      compressionRate: this.compressionRate,
      maxFileSize: this.maxFileSize,
    };
    this.dialogRef.close(imageCompressSettings);
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
