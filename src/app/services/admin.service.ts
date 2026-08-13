import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import { endPoints } from '../app.constants';
import { AdminResponse } from '../models/adminResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private readonly http: HttpClient) {
  }

  uploadFiles(selectedFiles: File[]): Promise<AdminResponse> {
    const fd = new FormData();
    selectedFiles.forEach((file) => {
      fd.append('files', file, file.name);
    });
    return firstValueFrom(this.http.post<AdminResponse>(endPoints.FILE_UPLOAD, fd));
  }

  loadAdmin(): Promise<AdminResponse> {
    return firstValueFrom(this.http.get<AdminResponse>(endPoints.ADMIN));
  }

}
