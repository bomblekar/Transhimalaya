import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule], // Must include TranslateModule
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'],
})
export class ItineraryComponent implements AfterViewInit, OnDestroy {
  
  openPackageName: string | null = null; 
  contactInfo = { phone: '+91 98160 39602', email: 'negiranjeet662@gmail.com' };

  constructor(public translate: TranslateService) {
    // Set Default Language
    this.translate.addLangs(['en', 'hi']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toggleLanguage() {
    const current = this.translate.currentLang;
    const next = current === 'en' ? 'hi' : 'en';
    this.translate.use(next);
  }

  togglePackage(pkgName: string) {
    this.openPackageName = this.openPackageName === pkgName ? null : pkgName;
  }

  toggleDay(day: any) {
    day.expanded = !day.expanded;
  }

  // --- Auto Scroll Logic ---
  @ViewChild('bannerContainer') bannerContainer!: ElementRef;
  slideInterval: any;

  ngAfterViewInit() { this.startAutoSlide(); }
  ngOnDestroy() { this.stopAutoSlide(); }

  startAutoSlide() {
    this.stopAutoSlide(); 
    this.slideInterval = setInterval(() => { this.scrollToNext(); }, 3000); 
  }

  stopAutoSlide() {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  pauseAutoSlide() { this.stopAutoSlide(); }

  scrollToNext() {
    if (!this.bannerContainer) return;
    const container = this.bannerContainer.nativeElement;
    const scrollAmount = container.offsetWidth * 0.85; 
    
    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' }); 
    } else {
      container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  }
}