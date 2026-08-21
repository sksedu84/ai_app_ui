import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { endPoints } from '../app.constants';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AdminService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should load the admin response', async () => {
    const resultPromise = service.loadAdmin();
    const request = http.expectOne(endPoints.ADMIN);

    expect(request.request.method).toBe('GET');
    const response = { uploadedFiles: ['guide.pdf'], aiResponse: '', status: 'success' };
    request.flush(response);

    await expect(resultPromise).resolves.toEqual(response);
  });

  it('should upload all selected files as multipart form data', async () => {
    const files = [new File(['one'], 'one.txt', { type: 'text/plain' }), new File(['two'], 'two.pdf')];
    const resultPromise = service.uploadFiles(files);
    const request = http.expectOne(endPoints.FILE_UPLOAD);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBeInstanceOf(FormData);
    expect((request.request.body as FormData).getAll('files')).toHaveLength(2);
    expect((request.request.body as FormData).getAll('files').map(file => (file as File).name)).toEqual([
      'one.txt',
      'two.pdf',
    ]);

    const response = { uploadedFiles: ['one.txt', 'two.pdf'], aiResponse: '', status: 'success' };
    request.flush(response);
    await expect(resultPromise).resolves.toEqual(response);
  });

  it('should call the ingest and refresh endpoints', async () => {
    const ingestPromise = service.ingestDocuments();
    const ingestRequest = http.expectOne(endPoints.URL_INGEST_DOCUMENTS);
    expect(ingestRequest.request.method).toBe('GET');
    ingestRequest.flush({ uploadedFiles: [], aiResponse: '', status: 'success' });

    const refreshPromise = service.refreshDatabase();
    const refreshRequest = http.expectOne(endPoints.URL_REFRESH_DOCUMENT);
    expect(refreshRequest.request.method).toBe('GET');
    refreshRequest.flush({ uploadedFiles: [], aiResponse: '', status: 'success' });

    await expect(ingestPromise).resolves.toEqual({ uploadedFiles: [], aiResponse: '', status: 'success' });
    await expect(refreshPromise).resolves.toEqual({ uploadedFiles: [], aiResponse: '', status: 'success' });
  });
});