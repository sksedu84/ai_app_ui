import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin } from './admin';
import { ProcessingService } from '../services/processing.service';
import { AdminService } from '../services/admin.service';
import { vi } from 'vitest';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  let adminServiceMock: {
    loadAdmin: ReturnType<typeof vi.fn>;
    uploadFiles: ReturnType<typeof vi.fn>;
    ingestDocuments: ReturnType<typeof vi.fn>;
    refreshDatabase: ReturnType<typeof vi.fn>;
  };
  let processingServiceMock: { isBusy: boolean; runWithLoader: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    adminServiceMock = {
      loadAdmin: vi.fn().mockResolvedValue({ uploadedFiles: ['existing.pdf'], aiResponse: '', status: '' }),
      uploadFiles: vi.fn().mockResolvedValue({ uploadedFiles: ['new.pdf'], aiResponse: '', status: '' }),
      ingestDocuments: vi.fn().mockResolvedValue({ uploadedFiles: ['ingested.pdf'], aiResponse: '', status: '' }),
      refreshDatabase: vi.fn().mockResolvedValue(undefined),
    };
    processingServiceMock = {
      isBusy: false,
      runWithLoader: vi.fn(async (_message: string, action: () => Promise<unknown>) => action()),
    };

    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        { provide: AdminService, useValue: adminServiceMock },
        { provide: ProcessingService, useValue: processingServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load uploaded files during initialization', () => {
    expect(component.uploadedFileNames).toEqual(['existing.pdf']);
    expect(component.statusText).toBe('Uploaded file list:');
  });

  it('should select files and upload them through the loader', async () => {
    const file = new File(['content'], 'notes.txt', { type: 'text/plain' });
    const input = { files: [file] } as unknown as HTMLInputElement;

    component.onFilesSelected({ target: input } as unknown as Event);
    expect(component.canUpload).toBe(true);

    await component.uploadSelectedFiles();

    expect(adminServiceMock.uploadFiles).toHaveBeenCalledWith([file]);
    expect(processingServiceMock.runWithLoader).toHaveBeenCalledWith('Uploading files...', expect.any(Function));
    expect(component.uploadedFileNames).toEqual(['new.pdf']);
    expect(component.selectedFiles).toEqual([]);
  });

  it('should not select or upload files while busy', async () => {
    processingServiceMock.isBusy = true;
    const file = new File(['content'], 'notes.txt');

    component.onFilesSelected({ target: { files: [file] } } as unknown as Event);
    await component.uploadSelectedFiles();

    expect(component.selectedFiles).toEqual([]);
    expect(adminServiceMock.uploadFiles).not.toHaveBeenCalled();
  });

  it('should ingest documents and refresh the database', async () => {
    await component['ingestDocuments']();
    await component['refreshDatabase']();

    expect(adminServiceMock.ingestDocuments).toHaveBeenCalledOnce();
    expect(adminServiceMock.refreshDatabase).toHaveBeenCalledOnce();
    expect(component.uploadedFileNames).toEqual(['ingested.pdf']);
  });

  it('should replace file state without mutating the response array', () => {
    const uploadedFiles = ['a.pdf', 'b.pdf'];
    component.loadUploadedFiles({ uploadedFiles, aiResponse: '', status: '' });

    uploadedFiles.push('c.pdf');

    expect(component.uploadedFileNames).toEqual(['a.pdf', 'b.pdf']);
  });
});
