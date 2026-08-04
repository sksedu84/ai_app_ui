import {Component, OnInit} from '@angular/core';
import {constants} from '../app.constants';
import {ProcessingService} from '../services/processing.service';
import {AdminService} from '../services/admin.service';
import {AdminResponse} from '../models/adminResponse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  readonly uploadFileText: string = constants.UPLOAD_FILE_TEXT;
  readonly uploadButtonText: string = constants.UPLOAD_BUTTON_TEXT;
  readonly databaseText: string = constants.DATABASE_TEXT;
  readonly documentsText: string = constants.DOCUMENTS_TEXT;
  readonly dataRefreshText: string = constants.DATA_REFRESH_TEXT;
  readonly acceptTypes: string = constants.ACCEPTABLE_FILE_TYPE;

  selectedFiles: File[] = [];
  uploadedFileNames: string[] = [];

  constructor(
    private readonly processingService: ProcessingService,
    private readonly adminService: AdminService,
  ) {}

  ngOnInit(): void {
    void this.initializeAdminPage();
  }

  get isBusy(): boolean {
    return this.processingService.isBusy;
  }

  get canUpload(): boolean {
    return !this.isBusy && this.selectedFiles.length > 0;
  }

  get statusText(): string {
    if (this.uploadedFileNames?.length === 0) return 'No files uploaded yet.';
    return 'Uploaded file list: ';
  }

  onFilesSelected(event: Event): void {
    if (this.isBusy) return;
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files ? Array.from(input.files) : [];
  }

  async uploadSelectedFiles(): Promise<void> {
    if (!this.canUpload) return;
    try {
      await this.processingService.runWithLoader('Uploading files...', async () => {
        const response: AdminResponse = await this.adminService.uploadFiles(this.selectedFiles);
        await this.loadUploadedFiles(response);
      });
      this.selectedFiles = [];
    } catch (e) {
      console.error('Upload failed', e);
    }
  }

  async refreshDatabase(): Promise<void> {
    if (this.isBusy) return;
    try {
      await this.processingService.runWithLoader('Refreshing database...', async () => {
        const response: AdminResponse = await this.adminService.refreshDatabase();
        await this.loadUploadedFiles(response);
      });
    } catch (e) {
      console.error('Database refresh failed.', e);
    }
  }

  async refreshDocuments(): Promise<void> {
    if (this.isBusy) return;
    try {
      await this.processingService.runWithLoader('Refreshing documents...', async () => {
        const response: AdminResponse = await this.adminService.refreshDocuments();
        await this.loadUploadedFiles(response);
      });
    } catch (e) {
      console.error('Document refresh failed.', e);
    }
  }

  private async initializeAdminPage(): Promise<void> {
    /*try {
      await this.processingService.runWithLoader('Loading uploaded files...', async () => {
        const response: AdminResponse = await this.adminService.loadAdmin();
        await this.loadUploadedFiles(response);
      });
    } catch (e) {
      console.error('Failed to initialize admin page.', e);
    }*/
  }

  async loadUploadedFiles(response: AdminResponse): Promise<void> {
    try {
      this.uploadedFileNames = response.uploadedFiles ?? [];
    } catch (e) {
      console.error('Failed to load uploaded files.', e);
      this.uploadedFileNames = [];
    }
  }
}
