import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFileUploadComponent } from './p-file-upload.component';

describe('PFileUploadComponent', () => {
  let component: PFileUploadComponent;
  let fixture: ComponentFixture<PFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
