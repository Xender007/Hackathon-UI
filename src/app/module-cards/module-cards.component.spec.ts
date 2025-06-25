import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCardsComponent } from './module-cards.component';

describe('ModuleCardsComponent', () => {
  let component: ModuleCardsComponent;
  let fixture: ComponentFixture<ModuleCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleCardsComponent]
    });
    fixture = TestBed.createComponent(ModuleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
