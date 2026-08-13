import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin } from './admin';
import { ProcessingService } from '../services/processing.service';
import { AdminService } from '../services/admin.service';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  const adminServiceMock = {
    loadAdmin: () => Promise.resolve({ uploadedFiles: [], aiResponse: '', status: '' }),
    uploadFiles: () => Promise.resolve({ uploadedFiles: [], aiResponse: '', status: '' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        { provide: AdminService, useValue: adminServiceMock },
        ProcessingService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
