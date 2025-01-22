import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlInputComponent } from './intl-input.component';

describe('IntlInputComponent', () => {
  let component: IntlInputComponent;
  let fixture: ComponentFixture<IntlInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntlInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
