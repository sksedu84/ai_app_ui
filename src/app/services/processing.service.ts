import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface ProcessingState {
  busy: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {
  private readonly stateSubject = new BehaviorSubject<ProcessingState>({
    busy: false,
    message: ''
  });
  private readonly errorMessageSubject = new BehaviorSubject<string>('');

  readonly state$ = this.stateSubject.asObservable();
  readonly errorMessage$ = this.errorMessageSubject.asObservable();

  get snapshot(): ProcessingState {
    return this.stateSubject.value;
  }

  get isBusy(): boolean {
    return this.snapshot.busy;
  }

  show(message = 'Please wait...'): void {
    this.clearError();
    this.stateSubject.next({
      busy: true,
      message
    });
  }

  hide(): void {
    this.stateSubject.next({
      busy: false,
      message: ''
    });
  }

  clearError(): void {
    this.errorMessageSubject.next('');
  }

  async runWithLoader<T>(message: string, action: () => Promise<T>): Promise<T> {
    this.show(message);

    try {
      return await action();
    } catch (error: unknown) {
      this.errorMessageSubject.next(this.getErrorMessage(error));
      throw error;
    } finally {
      this.hide();
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error;

      if (typeof apiError === 'string' && apiError.trim().length > 0) {
        return apiError;
      }

      if (apiError && typeof apiError === 'object' && 'message' in apiError) {
        const message = String(apiError.message ?? '').trim();
        if (message.length > 0) {
          return message;
        }
      }

      const statusCode = error.status ? ` (${error.status})` : '';
      return `Request failed${statusCode}. Please try again.`;
    }

    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    if (typeof error === 'string' && error.trim().length > 0) {
      return error;
    }

    return 'Something went wrong. Please try again.';
  }
}
