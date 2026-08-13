import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';
import { ProcessingService } from '../services/processing.service';
import { constants } from '../app.constants';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let busy = false;

  const processingServiceMock = {
    get isBusy(): boolean {
      return busy;
    }
  };

  beforeEach(async () => {
    busy = false;

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: ProcessingService, useValue: processingServiceMock }
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

  it('should return false when processing is not busy', () => {
    expect(component.isBusy).toBe(false);
  });

  it('should return true when processing is busy', () => {
    busy = true;
    expect(component.isBusy).toBe(true);
  });
});
