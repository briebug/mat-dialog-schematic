import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

import { TestNameDialogComponent } from './test-name-dialog.component';

describe('TestNameDialogComponent', () => {
  let component: TestNameDialogComponent;
  let fixture: ComponentFixture<TestNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ TestNameDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
