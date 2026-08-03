import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {end_points} from '../app.constants';
import {PromptResponse} from '../models/promptResponse';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  async processSearchPrompt(userPrompt: string): Promise<PromptResponse> {
    const params: HttpParams = new HttpParams().set('prompt', userPrompt);
    return await firstValueFrom(
      this.http.get<PromptResponse>(end_points.SEARCH_PROMPT, {params})
    );
  }

  async processChatPrompt(userPrompt: string): Promise<PromptResponse> {
    const params: HttpParams = new HttpParams().set('prompt', userPrompt);
    return await firstValueFrom(
      this.http.get<PromptResponse>(end_points.CHAT_PROMPT, {params})
    );
  }
}
