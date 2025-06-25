import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-module-cards',
  templateUrl: './module-cards.component.html',
  styleUrls: ['./module-cards.component.css']
})
export class ModuleCardsComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  showLeftArrow = false;
  showRightArrow = false;
  showArrows = false;

  modules = [
    {
      title: 'Welcome message by Pravin Rao COO Infosys',
      duration: '3m 14s',
      level: 'Beginner',
      type: 'Article',
      rating: 4.8,
      description:
        'U.B. Pravin welcomes you and talks about values and facilities that make Infosys unique.',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Infosys Strategy Narrative by CEO',
      duration: '5m 2s',
      level: 'Beginner',
      type: 'Insights',
      rating: 4.8,
      description: 'CEO Salil Parekh describes Infosys strategy for client success.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Message from Head of Global Delivery',
      duration: '3m 57s',
      level: 'Beginner',
      type: 'Insights',
      rating: 4.8,
      description: 'Thoughts on delivery trends and Infosys operations.',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Meet your onboarding buddy',
      duration: '2m 10s',
      level: 'Beginner',
      type: 'Article',
      rating: 4.9,
      description: 'A walkthrough of your onboarding companion.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80',
    },
        {
      title: 'Welcome message by Pravin Rao COO Infosys',
      duration: '3m 14s',
      level: 'Beginner',
      type: 'Article',
      rating: 4.8,
      description:
        'U.B. Pravin welcomes you and talks about values and facilities that make Infosys unique.',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Infosys Strategy Narrative by CEO',
      duration: '5m 2s',
      level: 'Beginner',
      type: 'Insights',
      rating: 4.8,
      description: 'CEO Salil Parekh describes Infosys strategy for client success.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Message from Head of Global Delivery',
      duration: '3m 57s',
      level: 'Beginner',
      type: 'Insights',
      rating: 4.8,
      description: 'Thoughts on delivery trends and Infosys operations.',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Meet your onboarding buddy',
      duration: '2m 10s',
      level: 'Beginner',
      type: 'Article',
      rating: 4.9,
      description: 'A walkthrough of your onboarding companion.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80',
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => this.updateArrows(), 100);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 350);
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 350);
  }

  onScroll() {
    this.updateArrows();
  }

  private updateArrows() {
    const el = this.scrollContainer.nativeElement;
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.showLeftArrow = scrollLeft > 10;
    this.showRightArrow = scrollLeft < maxScrollLeft - 10;
  }
}
