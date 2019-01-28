import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';

import { TestNameComponent } from './test-name.component';

describe('TestNameComponent', () => {
  let component: TestNameComponent;
  let fixture: ComponentFixture<TestNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ TestNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
