import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  readonly chatModeText: string = constants.CHAT_MODE_TEXT;
  readonly searchModeText: string = constants.SEARCH_MODE_TEXT;
  readonly responseText: string = constants.RESPONSE_TEXT;
  readonly promptText: string = constants.PROMPT_TEXT;
  readonly submitText: string = constants.SUBMIT_TEXT;

  public mode: string = '';
  public userPrompt: string = '';
  public chatWithHistory: Array<{ user: string; agent: string }> = [];
  public response: PromptResponse = new PromptResponse();

  @ViewChild('responseBox') responseBox!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly processingService: ProcessingService,
    private readonly promptService: PromptService,
  ) {}

  ngOnInit(): void {
    void this.initializePromptPage();
  }

  private async initializePromptPage(): Promise<void> {
    try {
      await this.processingService.runWithLoader('Loading application...', async () => {
        this.mode = constants.CHAT_MODE;
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

  public onModeChange(): void {
    if (this.mode === constants.CHAT_MODE) {
      this.response.searchResponse = '';
    } else if (this.mode === constants.SEARCH_MODE) {
      this.response.chatResponse = '';
      this.chatWithHistory = [];
    }
  }

  scrollLastAgentToTop(): void {
    setTimeout(() => {
      const lastAgent = this.responseBox?.nativeElement.querySelector(
        '.agent:last-child',
      ) as HTMLElement | null;
      lastAgent?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  public async sendPrompt(): Promise<void> {
    const prompt = this.userPrompt.trim();

    if (!prompt) {
      return;
    }

    try {
      await this.processingService.runWithLoader('Processing your prompt...', async () => {
        if (this.mode === constants.CHAT_MODE) {
          this.response = await this.promptService.processChatPrompt(prompt);
          this.chatWithHistory = [
            ...this.chatWithHistory,
            {
              user: prompt,
              agent: this.response.chatResponse,
            },
          ];
          this.scrollLastAgentToTop();
        } else if (this.mode === constants.SEARCH_MODE) {
          this.response = await this.promptService.processSearchPrompt(prompt);
        }
        this.userPrompt = '';
      });
    } catch (e) {
      console.error('Prompt processing failed.', e);
    }
  }
}
