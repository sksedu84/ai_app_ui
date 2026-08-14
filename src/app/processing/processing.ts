import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProcessingService, ProcessingState } from '../services/processing.service';
import { interval, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-processing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  templateUrl: './processing.html',
  styleUrl: './processing.css',
})
export class Processing {
  readonly state$: Observable<ProcessingState>;
  readonly elapsedTime$: Observable<string>;

  constructor(private readonly processingService: ProcessingService) {
    this.state$ = this.processingService.state$;

    this.elapsedTime$ = this.state$.pipe(
      map(state => state.busy),
      distinctUntilChanged(),
      switchMap(busy => {
        if (!busy) return of('');
        const start = Date.now();
        return interval(10).pipe(
          map(() => {
            const elapsed = Date.now() - start;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const ms = elapsed % 1000;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
          })
        );
      })
    );
  }
}
