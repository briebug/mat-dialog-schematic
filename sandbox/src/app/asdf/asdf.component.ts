// prettier-ignore
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AsdfDialogComponent } from '../asdf-dialog/asdf-dialog.component';

@Component({
  selector: 'app-asdf',
  templateUrl: './asdf.component.html',
  styleUrls: ['./asdf.component.css']
})
export class AsdfComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

 openDialog(): void {
    const dialogRef = this.dialog.open(AsdfDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
