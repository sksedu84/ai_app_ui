import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { constants } from '../app.constants';
import { PromptResponse } from '../models/promptResponse';
import { ProcessingService } from '../services/processing.service';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-rag',
  templateUrl: './rag.html',
  imports: [FormsModule],
})
export class Rag implements OnInit {
  readonly submitText: string = constants.SUBMIT_TEXT;

  public mode: string = '';
  public userPrompt: string = '';

  public promptResponse: PromptResponse = new PromptResponse();

  @ViewChild('responseBox') responseBox!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly processingService: ProcessingService,
    private readonly promptService: PromptService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    void this.initializePromptPage();
  }

  private async initializePromptPage(): Promise<void> {
    try {
      await this.processingService.runWithLoader('Loading application...', async () => {
        this.mode = constants.RAG_MODE;
      });
    } catch (e) {
      console.error('Failed to initialize prompt page.', e);
    }
  }

  public get isBusy(): boolean {
    return this.processingService.isBusy;
  }

  public get canPrompt(): boolean {
    return !this.isBusy && this.userPrompt.trim().length > 0;
  }

  public async sendPrompt(): Promise<void> {
    const prompt = this.userPrompt.trim();

    if (!prompt) {
      return;
    }

    try {
      await this.processingService.runWithLoader('Processing for your prompt...', async () => {
        if (this.mode === constants.RAG_MODE) {
          this.promptResponse = await this.promptService.processSearchPrompt(prompt);
        }
        this.userPrompt = '';
        this.cdr.markForCheck();
      });
    } catch (e) {
      console.error('Prompt processing failed.', e);
    }
  }
}
