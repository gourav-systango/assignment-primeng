import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlTelInputComponent } from './intl-tel-input.component';

describe('IntlTelInputComponent', () => {
  let component: IntlTelInputComponent;
  let fixture: ComponentFixture<IntlTelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntlTelInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntlTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
