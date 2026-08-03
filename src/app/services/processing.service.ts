import { Injectable } from '@angular/core';
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

  readonly state$ = this.stateSubject.asObservable();

  get snapshot(): ProcessingState {
    return this.stateSubject.value;
  }

  get isBusy(): boolean {
    return this.snapshot.busy;
  }

  show(message = 'Please wait...'): void {
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

  async runWithLoader<T>(message: string, action: () => Promise<T>): Promise<T> {
    this.show(message);

    try {
      return await action();
    } finally {
      this.hide();
    }
  }
}
