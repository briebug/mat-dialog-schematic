// prettier-ignore
import { Component, OnDestroy<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { <%= classify(name2) %>Component } from '../<%= dasherize(name2) %>/<%= dasherize(name2) %>.component';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `
    <button (click)="openDialog()">launch dialog</button>
  `,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: []<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

 openDialog(): void {
    const dialogRef = this.dialog.open(<%= classify(name2) %>Component, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
