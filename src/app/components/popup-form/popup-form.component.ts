import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
export class PopupFormComponent implements OnInit, OnDestroy {
  formContext: PopupFormContext;
  result: PopupFormSubmitResult | undefined;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: PopupFormContext
  ) {
    this.formContext = data;
  }

  ngOnInit(): void {
    this.result = {
      data: {},
      type: this.formContext.type,
      referenceId: this.formContext.referenceId,
    };
  }
  ngOnDestroy(): void {
    this.result = undefined;
  }

  handleSubmit() {
    this.dialogRef.close(this.result);
  }

  handleCancel() {
    this.dialogRef.close();
  }

  changeDropdownValue(propertyName: string, changedValue: string) {
    this.result!.data[propertyName] = changedValue;
  }
}
