import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-upload',
  templateUrl: './login-upload.component.html',
  styleUrls: ['./login-upload.component.css'],
})
export class LoginUploadComponent implements AfterViewInit {
  uploadType: string = '';
  selectedGroup: string = '';
  uploadedLink: string = '';
  fileDescription: string = '';
  selectedFile: File | null = null;

  groups: string[] = ['Group A', 'Group B', 'Group C'];
  displayedColumns: string[] = ['fileName', 'description', 'createdAt', 'updatedAt', 'createdBy', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,
      private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit(): void {
    this.fetchUploadedFiles();
  }

  fetchUploadedFiles(): void {
    this.spinner.show();
    this.http.get<any>('http://20.246.73.80:5000/api/files').subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.files)) {
          const files = response.files.map((file: any) => ({
            fileName: file.file_name,
            description: file.description || 'No description',
            createdAt: new Date(file['creation time']),
            updatedAt: new Date(file['last_modified']),
            createdBy: file.group_name || 'User',
            downloadLink: file.download_url,
            fileBlob: null,
          }));

          // Refresh table with new data
          this.dataSource.data = files;

          // Reconnect paginator and sort
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide()
        }
      },
      error: (error) => {
        console.error('Failed to load uploaded files:', error);
        this.spinner.hide();
      }
    });
  }


  onUploadTypeChange(): void {
    this.selectedGroup = '';
    this.uploadedLink = '';
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(fileInput?: HTMLInputElement): void {
    this.spinner.show();
    if (this.uploadType === 'file') {
    if (!this.selectedFile || !this.selectedGroup || !this.fileDescription) {
      alert('Please select a file, group, and enter description.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('group_name', this.selectedGroup);
    formData.append('description', this.fileDescription);

    this.http.post<any>('http://20.246.73.80:5000/api/upload', formData).subscribe({
      next: (response) => {
        this.selectedFile = null;
        this.fileDescription = '';
        if (fileInput) fileInput.value = '';
        this.fetchUploadedFiles(); // Refresh the table
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Upload failed. Please try again.');
        this.spinner.hide();
      }
    });
  } else if (this.uploadType === 'link') {
      if (!this.uploadedLink) {
        alert('Please enter a valid link.');
        return;
      }

      const newFile = {
        fileName: this.uploadedLink.split('/').pop(),
        description: 'Uploaded via link',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'User',
        downloadLink: this.uploadedLink,
        fileBlob: null,
      };

      //this.dataSource.data = [...this.dataSource.data, newFile];
      this.uploadedLink = '';
    }
  }

  editFile(file: any): void {
    console.log('Edit', file);
    // Future: open dialog or inline edit
  }

  deleteFile(file: any): void {
  const confirmed = confirm(`Are you sure you want to delete "${file.fileName}"?`);
  if (!confirmed) return;

  this.spinner.show();
  this.http.delete<any>(`http://20.246.73.80:5000/api/files/${encodeURIComponent(file.fileName)}`)
    .subscribe({
      next: (response) => {
        if (response.success) {
          // Remove the file from table
          const index = this.dataSource.data.indexOf(file);
          if (index >= 0) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription(); // Refresh the table
          }
          alert(`Deleted successfully: ${file.fileName}`);
          this.spinner.hide();
        } else {
          alert(`Failed to delete: ${file.fileName}`);
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert(`Delete failed: ${file.fileName}`);
        this.spinner.hide();
      }
    });
  }


  downloadFile(file: any): void {
    if (file.downloadLink) {
      window.open(file.downloadLink, '_blank');
    } else {
      alert('Download link not available.');
    }
  }
}
