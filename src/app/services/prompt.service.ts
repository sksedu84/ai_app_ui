import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import { endPoints } from '../app.constants';
import { PromptResponse } from '../models/promptResponse';

@Injectable({
  providedIn: 'root'
})

export class PromptService {
  constructor(private readonly http: HttpClient) {}

  processSearchPrompt(userPrompt: string): Promise<PromptResponse> {
    const params: HttpParams = new HttpParams().set('prompt', userPrompt);
    return firstValueFrom(this.http.get<PromptResponse>(endPoints.RAG, { params }));
  }

}
