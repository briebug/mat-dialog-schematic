// prettier-ignore
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TestNameDialogComponent } from '../test-name-dialog/test-name-dialog.component';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.css']
})
export class TestNameComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

 openDialog(): void {
    const dialogRef = this.dialog.open(TestNameDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
