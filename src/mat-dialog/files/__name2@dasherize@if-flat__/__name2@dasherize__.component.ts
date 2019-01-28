import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './<%= dasherize(name2) %>.component.html',
  styleUrls: ['./<%= dasherize(name2) %>.component.<%= styleext %>']
})
export class <%= classify(name2) %>Component {

  constructor(
    public dialogRef: MatDialogRef<<%= classify(name2) %>Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
