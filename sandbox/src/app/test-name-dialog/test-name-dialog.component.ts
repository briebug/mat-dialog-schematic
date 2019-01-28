import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './test-name-dialog.component.html',
  styleUrls: ['./test-name-dialog.component.css']
})
export class TestNameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TestNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
