import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Header } from './header';
import { ProcessingService } from '../services/processing.service';
import { constants } from '../app.constants';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let processingState: BehaviorSubject<{ busy: boolean; message: string }>;

  beforeEach(async () => {
    processingState = new BehaviorSubject<{ busy: boolean; message: string }>({ busy: false, message: '' });

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: ProcessingService, useValue: { state$: processingState.asObservable() } }
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
});
