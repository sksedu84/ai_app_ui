import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { constants } from '../app.constants';
import { ProcessingService } from '../services/processing.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
})
export class Header {
  protected readonly title: string = constants.APP_TITLE;
  protected readonly menuItems = [
    { text: constants.HEADER_MENU_ADMIN_TEXT, routerLink: '/admin' },
  ];
  protected readonly state$;
  protected readonly errorMessage$;

  constructor(private readonly processingService: ProcessingService) {
    this.state$ = processingService.state$;
    this.errorMessage$ = processingService.errorMessage$;
  }

  protected clearError(): void {
    this.processingService.clearError();
  }
}
