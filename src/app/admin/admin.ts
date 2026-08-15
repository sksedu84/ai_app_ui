import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { constants } from '../app.constants';
import { ProcessingService } from '../services/processing.service';
import { AdminService } from '../services/admin.service';
import { AdminResponse } from '../models/adminResponse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private readonly cdr: ChangeDetectorRef,
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
    return this.uploadedFileNames.length === 0 ? 'No files uploaded yet.' : 'Uploaded file list:';
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
        this.loadUploadedFiles(response);
      });
      this.selectedFiles = [];
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      this.cdr.markForCheck();
    }
  }

  private async initializeAdminPage(): Promise<void> {
    try {
      await this.processingService.runWithLoader('Loading uploaded files...', async () => {
        const response: AdminResponse = await this.adminService.loadAdmin();
        this.loadUploadedFiles(response);
      });
    } catch (e) {
      console.error('Failed to initialize admin page.', e);
    } finally {
      this.cdr.markForCheck();
    }
  }

  loadUploadedFiles(response: AdminResponse): void {
    this.uploadedFileNames = response.uploadedFiles?.slice() ?? [];
    this.cdr.markForCheck();
  }

  protected async refreshDocuments() {
    if (this.isBusy) return;
    try {
      await this.processingService.runWithLoader('Documents ingesting...', async () => {
        const response: AdminResponse = await this.adminService.refreshDocuments();
        this.loadUploadedFiles(response);
      });
    } catch (e) {
      console.error('Document refresh failed.', e);
    } finally {
      this.cdr.markForCheck();
    }
  }
}
