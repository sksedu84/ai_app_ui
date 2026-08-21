import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rag } from './rag';
import { provideRouter } from '@angular/router';
import { ProcessingService } from '../services/processing.service';
import { PromptService } from '../services/prompt.service';
import { constants } from '../app.constants';
import { vi } from 'vitest';

describe('Rag', () => {
  let component: Rag;
  let fixture: ComponentFixture<Rag>;
  let processingService: { isBusy: boolean; runWithLoader: ReturnType<typeof vi.fn> };
  let promptService: { processSearchPrompt: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    TestBed.resetTestingModule();
    processingService = {
      isBusy: false,
      runWithLoader: vi.fn(async (_message: string, action: () => Promise<unknown>) => action()),
    };
    promptService = {
      processSearchPrompt: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Rag],
      providers: [
        provideRouter([]),
        { provide: ProcessingService, useValue: processingService },
        { provide: PromptService, useValue: promptService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Rag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in RAG mode and disable prompting for blank input', () => {
    expect(component.mode).toBe(constants.RAG_MODE);
    component.userPrompt = '   ';

    expect(component.canPrompt).toBe(false);
  });

  it('should submit a trimmed prompt, store the response, and clear the input', async () => {
    const response = { status: 'success', response: '<p>Answer</p>' };
    promptService.processSearchPrompt.mockResolvedValue(response);
    component.userPrompt = '  What is the status?  ';

    await component.sendPrompt();

    expect(processingService.runWithLoader).toHaveBeenCalledWith(
      'Processing for your prompt...',
      expect.any(Function),
    );
    expect(promptService.processSearchPrompt).toHaveBeenCalledWith('What is the status?');
    expect(component.promptResponse).toEqual(response);
    expect(component.userPrompt).toBe('');
  });

  it('should ignore empty prompts and report busy state', async () => {
    component.userPrompt = '   ';
    await component.sendPrompt();
    expect(processingService.runWithLoader).not.toHaveBeenCalled();

    component.userPrompt = 'Valid prompt';
    processingService.isBusy = true;
    expect(component.canPrompt).toBe(false);
  });

  it('should clear the prompt even when processing fails', async () => {
    promptService.processSearchPrompt.mockRejectedValue(new Error('Request failed'));
    component.userPrompt = '  Retry this  ';

    await component.sendPrompt();

    expect(component.userPrompt).toBe('');
  });
});
