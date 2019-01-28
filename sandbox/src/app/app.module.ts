import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestNameComponent } from './test-name/test-name.component';
import { TestNameDialogComponent } from './test-name-dialog/test-name-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, TestNameComponent, TestNameDialogComponent],
  imports: [BrowserModule, MatButtonModule, MatDialogModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestNameDialogComponent]
})
export class AppModule {}
