import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';
import { Header } from './header';
import { ProcessingService } from '../services/processing.service';
import { constants } from '../app.constants';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let processingState: BehaviorSubject<{ busy: boolean; message: string }>;
  let errorMessage: BehaviorSubject<string>;
  const clearErrorSpy = vi.fn();

  beforeEach(async () => {
    clearErrorSpy.mockClear();
    processingState = new BehaviorSubject<{ busy: boolean; message: string }>({ busy: false, message: '' });
    errorMessage = new BehaviorSubject<string>('');

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        {
          provide: ProcessingService,
          useValue: {
            state$: processingState.asObservable(),
            errorMessage$: errorMessage.asObservable(),
            clearError: clearErrorSpy,
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize title from constants', () => {
    expect(component['title']).toBe(constants.APP_TITLE);
  });

  it('should initialize header menu items from constants', () => {
    expect(component['menuItems']).toEqual([
      { text: constants.HEADER_MENU_ADMIN_TEXT, routerLink: '/admin' },
    ]);
  });

  it('should clear disabled links when processing finishes', () => {
    processingState.next({ busy: true, message: 'Uploading files...' });
    fixture.detectChanges();

    const titleLink = fixture.nativeElement.querySelector('.site-header__title-link');
    expect(titleLink.classList).toContain('is-disabled');

    processingState.next({ busy: false, message: '' });
    fixture.detectChanges();

    expect(titleLink.classList).not.toContain('is-disabled');
  });

  it('should display top error message when service reports an error', () => {
    errorMessage.next('Request failed. Please try again.');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.site-error');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Request failed. Please try again.');
  });

  it('should clear error on dismiss action', () => {
    errorMessage.next('Request failed. Please try again.');
    fixture.detectChanges();

    const dismissButton = fixture.nativeElement.querySelector('.site-error__close');
    dismissButton.click();

    expect(clearErrorSpy).toHaveBeenCalled();
  });
});
