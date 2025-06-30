import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-login-upload',
  templateUrl: './login-upload.component.html',
  styleUrls: ['./login-upload.component.css'],
})
export class LoginUploadComponent implements AfterViewInit {
  uploadType: 'file' | 'link' = 'file';
  uploadedLink = '';
  selectedFile: File | null = null;
  selectedGroup = '';
  groups = ['Group A', 'Group B', 'Group C'];

  displayedColumns: string[] = ['fileName', 'description', 'createdAt', 'updatedAt', 'createdBy', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload(fileInput?: HTMLInputElement) {
    if (this.uploadType === 'file' && this.selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: this.selectedFile!.type });
        const blobUrl = window.URL.createObjectURL(blob);

        const newFile = {
          fileName: this.selectedFile!.name,
          description: 'Uploaded file',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'User',
          downloadLink: blobUrl,
          fileBlob: blob
        };

        this.dataSource.data = [...this.dataSource.data, newFile];
        this.selectedFile = null;

        if (fileInput) {
          fileInput.value = ''; // ✅ reset input
        }
      };

      reader.readAsArrayBuffer(this.selectedFile);
    }

    if (this.uploadType === 'link' && this.uploadedLink) {
      const newFile = {
        fileName: this.extractFileName(this.uploadedLink),
        description: 'Linked file',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'User',
        downloadLink: this.uploadedLink,
        fileBlob: null
      };

      this.dataSource.data = [...this.dataSource.data, newFile];
      this.uploadedLink = '';
    }
  }

  extractFileName(link: string): string {
    try {
      return decodeURIComponent(link.split('/').pop() || 'downloaded-file');
    } catch {
      return 'downloaded-file';
    }
  }

  editFile(file: any) {
    alert(`Editing: ${file.fileName}`);
  }

  deleteFile(file: any) {
    if (file.downloadLink.startsWith('blob:')) {
      window.URL.revokeObjectURL(file.downloadLink);
    }
    this.dataSource.data = this.dataSource.data.filter(f => f !== file);
  }

  downloadFile(file: any) {
    if (file.downloadLink.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = file.downloadLink;
      a.download = file.fileName;
      a.click();
    } else {
      this.http.get(file.downloadLink, { responseType: 'blob' }).subscribe(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = file.fileName;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      }, error => {
        console.error('Download failed:', error);
        alert('Failed to download file.');
      });
    }
  }
}
