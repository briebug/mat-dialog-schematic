import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './asdf-dialog.component.html',
  styleUrls: ['./asdf-dialog.component.css']
})
export class AsdfDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AsdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
