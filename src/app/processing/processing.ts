import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProcessingService, ProcessingState } from '../services/processing.service';
import { Observable } from 'rxjs';
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

  constructor(private readonly processingService: ProcessingService) {
    this.state$ = this.processingService.state$;
  }
}
