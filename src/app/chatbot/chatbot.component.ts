import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStoreService } from '../shared/token-store.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  public isMinimized = true;
  private chatInstance: any;
  private hasGreeted = false;

  @ViewChild('chatbotContainer', { static: true }) chatbotContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private tokenStore: TokenStoreService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.tokenStore.getAccessToken();
      console.log('Token:', token);
      // Delay ensures DOM is ready after MSAL redirect
      setTimeout(() => this.loadChat(), 300);
    }
  }

  toggleChat(): void {
    this.isMinimized = !this.isMinimized;

    if (!this.isMinimized && this.chatInstance) {
      const hasMessages = this.chatInstance.messages?.length > 0;
      if (!hasMessages && !this.hasGreeted) {
        setTimeout(() => {
          this.chatInstance.addMessage?.({
            text: 'Welcome! Ask me anything.',
            role: 'ai',
            typing: true,
          });
        }, 300);
        this.hasGreeted = true;
      }
    }
  }

  private async loadChat(): Promise<void> {
    const container = this.chatbotContainer?.nativeElement || document.getElementById('chatbot-container');
    if (!container) return;

    // Prevent re-adding deep-chat
    if (container.querySelector('deep-chat')) return;

    const { DeepChat } = await import('deep-chat');
    const chat = document.createElement('deep-chat') as any;
    this.chatInstance = chat;

    chat.connect = {
      url: 'http://74.235.189.94:8000/semantic/search',
      method: 'POST',
    };

    chat.requestInterceptor = (req: any) => {
      const token = localStorage.getItem('access_token');
      const messages = req.body?.messages || [];
      req.body = {
        text : messages[messages.length - 1]?.text?.trim() || '',
      };
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      };
      return req;
    };

    chat.responseInterceptor = (res: any) => {
      return { text: res.ai_answer || 'No answer received' };
    };

    chat.setAttribute(
      'style',
      `
      width: 100%;
      height: 100%;
      border: none;
      background-color: #1e1e1e;
      color: black;
    `
    );

    chat.textInput = {
      styles: {
        text: { paddingRight: '40px' },
      },
    };

    chat.submitButtonStyles = {
      submit: {
        container: {
          default: { backgroundColor: 'black' },
          hover: { backgroundColor: '#3D3D3D' },
          click: { backgroundColor: '#555555' },
        },
        svg: {
          styles: {
            default: {
              filter:
                'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(273deg) brightness(103%) contrast(103%)',
            },
          },
          content: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
        },
      },
    };

    chat.microphone = {
      button: {
        default: {
          container: {
            hover: { backgroundColor: '#7fbded69' },
            click: { backgroundColor: '#4babf669' },
          },
          svg: {
            styles: {
              default: {
                filter:
                  'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                width: '24px',
                height: '24px',
              },
              hover: {
                filter:
                  'brightness(0) saturate(100%) invert(88%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(130%) contrast(100%)',
              },
            },
            content: `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm0 15a6 6 0 006-6h-1.5a4.5 4.5 0 01-9 0H6a6 6 0 006 6zm-1 2h2v3h-2v-3z"/>
              </svg>`,
          },
        },
        active: {
          container: {
            hover: { backgroundColor: '#ffd07c70' },
            click: { backgroundColor: '#ecb85c70' },
          },
          svg: {
            styles: {
              default: {
                filter:
                  'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                width: '24px',
                height: '24px',
              },
            },
          },
        },
      },
    };

    container.appendChild(chat);
  }
}
