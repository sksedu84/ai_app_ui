import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rag } from './rag';

describe('Rag', () => {
  let component: Rag;
  let fixture: ComponentFixture<Rag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rag],
    }).compileComponents();

    fixture = TestBed.createComponent(Rag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
