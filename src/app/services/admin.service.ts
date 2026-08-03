import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {end_points} from '../app.constants';
import {AdminResponse} from '../models/adminResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private readonly http: HttpClient) {
  }

  async refreshDatabase(): Promise<AdminResponse> {
    console.log('Refreshing database...');
    return firstValueFrom(this.http.get<AdminResponse>(end_points.REFRESH_DATABASE));
  }

  async refreshDocuments(): Promise<AdminResponse> {
    console.log('Refreshing documents...');
    return firstValueFrom(this.http.get<AdminResponse>(end_points.REFRESH_DOCUMENT));
  }

  async uploadFiles(selectedFiles: File[]): Promise<AdminResponse> {
    const fd = new FormData();
    selectedFiles.forEach((file) => {
      fd.append('files', file, file.name);
    });
    return firstValueFrom(this.http.post<AdminResponse>(end_points.FILE_UPLOAD, fd));
  }

  async loadAdmin(): Promise<AdminResponse> {
    return firstValueFrom(this.http.get<AdminResponse>(end_points.ADMIN));
  }

}
