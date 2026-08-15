import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessingService } from './processing.service';

describe('ProcessingService', () => {
  let service: ProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingService);
  });

  it('should publish a readable error when request fails', async () => {
    let latestErrorMessage = '';
    const subscription = service.errorMessage$.subscribe(message => {
      latestErrorMessage = message;
    });
    const error = new HttpErrorResponse({
      status: 500,
      error: { message: 'Backend unavailable' }
    });

    await expect(service.runWithLoader('Loading data...', async () => Promise.reject(error))).rejects.toBe(error);

    expect(latestErrorMessage).toBe('Backend unavailable');
    expect(service.isBusy).toBeFalsy();
    subscription.unsubscribe();
  });

  it('should clear the previous error when a new request starts', async () => {
    let latestErrorMessage = '';
    const subscription = service.errorMessage$.subscribe(message => {
      latestErrorMessage = message;
    });

    await expect(
      service.runWithLoader('Loading data...', async () => Promise.reject(new Error('Initial failure')))
    ).rejects.toThrowError('Initial failure');

    expect(latestErrorMessage).toBe('Initial failure');

    await service.runWithLoader('Retrying...', async () => Promise.resolve());

    expect(latestErrorMessage).toBe('');
    subscription.unsubscribe();
  });
});
