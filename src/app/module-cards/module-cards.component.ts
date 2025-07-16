import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-module-cards',
  templateUrl: './module-cards.component.html',
  styleUrls: ['./module-cards.component.css']
})
export class ModuleCardsComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  showLeftArrow = false;
  showRightArrow = false;
  showArrows = false;

  files : any;

  modules: any[] = [];

  content: any[] = [];

  constructor(private http: HttpClient, private router: Router , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.fetchModules();
    this.fetchUploadedFiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateArrows(), 100);
  }

  fetchModules(): void {
    this.spinner.show();
    this.http.get<any[]>('http://74.235.189.94:8000/module/latest').subscribe({
      next: (data) => {
        this.modules = data;
        setTimeout(() => this.updateArrows(), 200);
        // ensure arrows update after view is rendered
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Failed to fetch modules:', error);
        this.spinner.hide();
      }
    });
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 350);
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 350);
  }

  onScroll(): void {
    this.updateArrows();
  }

  private updateArrows(): void {
    const el = this.scrollContainer.nativeElement;
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.showLeftArrow = scrollLeft > 10;
    this.showRightArrow = scrollLeft < maxScrollLeft - 10;
  }

  fetchUploadedFiles(): void {
    this.http.get<any>('http://74.235.189.94:8000/file/getAllFiles').subscribe({
      next: (response: any) => {
        if (response.success && Array.isArray(response.files)) {
          this.files = response.files.map((file: any) => ({
            fileName: file.file_name,
            description: file.description || 'No description',
            createdAt: new Date(file['creation time']),
            updatedAt: new Date(file['last_modified']),
            createdBy: file.group_name || 'User',
            downloadLink: file.download_url,
            fileBlob: null,
            document_id: file.document_id,
          }));
          this.content = [...this.files];
        }
      },
      error: (error : any) => {
        console.error('Failed to load uploaded files:', error);
      }
    });
  }

  OnStartClick(title: string): void {
    this.router.navigateByUrl(`/quiz?title=${encodeURIComponent(title)}`);
  }

  onStartContentClick(fileName: string, document_id: string, status: string): void {
    // // TODO: Download logic (if needed)
    // console.log(this.getDownloadUrl(fileName))
    // this.downloadFile(this.getDownloadUrl(fileName));

    // // ✅ Call the learning tracker API
    // const apiUrl = `http://74.235.189.94:8000/module/learning/tracker?asset_id=${document_id}`;

    // //if(status.toLocaleLowerCase() != 'in-progress')
    // {      
    //   this.http.post(apiUrl, {}).subscribe({
    //     next: (response) => {
    //       console.log('Progress updated successfully', response);
    //       this.fetchModules();
    //     },
    //     error: (error) => {
    //       console.error('Error updating progress', error);
    //     }
    //   });
    // }

    this.OnStartClick(document_id);
  }

  getDownloadUrl(fileName: string): string | undefined {
    const matchedFile = this.files.find((file: any) => file.fileName === fileName);

    if (matchedFile) {
      return matchedFile.downloadLink;
    } else {
      console.warn(`No file found for: ${fileName}`);
      return undefined;
    }
  }

  downloadFile(link: any): void {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Download link not available.');
    }
  }
}


