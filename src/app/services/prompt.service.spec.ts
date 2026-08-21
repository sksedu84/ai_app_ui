import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { endPoints } from '../app.constants';
import { PromptService } from './prompt.service';

describe('PromptService', () => {
  let service: PromptService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromptService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PromptService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should send the prompt as a query parameter and return the response', async () => {
    const resultPromise = service.processSearchPrompt('What is new?');
    const request = http.expectOne(request => request.url === endPoints.RAG);

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('prompt')).toBe('What is new?');

    const response = { status: 'success', response: 'Everything is current.' };
    request.flush(response);
    await expect(resultPromise).resolves.toEqual(response);
  });
});