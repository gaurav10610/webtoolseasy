import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  PopupFormContext,
  PopupFormSubmitResult,
} from 'src/app/@types/popup-form';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss'],
})
export class PopupFormComponent {
  formContext: PopupFormContext;
  result: PopupFormSubmitResult | undefined;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: PopupFormContext
  ) {
    this.formContext = data;
    this.result = {
      data: {},
      type: this.formContext.type,
      referenceId: this.formContext.referenceId,
    };
  }

  applySettings() {
    this.dialogRef.close(this.result);
  }

  cancelDialog() {
    this.dialogRef.close();
  }

  changeDropdownValue(propertyName: string, changedValue: string) {
    this.result!.data[propertyName] = changedValue;
  }
}
