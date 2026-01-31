import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TravelDataService } from '../services/travel-data.service'; // Ensure path is correct
import { Footer } from '../footer/footer';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule, Footer],
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'], // Ensure you have this file
})
export class ItineraryComponent implements OnInit, AfterViewInit, OnDestroy {

  // --- DYNAMIC DATA PROPERTIES ---
  operatorName: string = '';
  tagline: string = '';
  siteTitles: any = {};
  siteLabels: any = {};
  siteContact: any = {};

  tourPackages: any[] = [];
  banners: any[] = [];
  testimonials: any[] = [];

  // --- STATIC OPTIONS ---
  carOptions = [
    { id: 'sedan', name: 'Sedan (Dzire/Etios)', extraCost: 0 },
    { id: 'ertiga', name: 'Ertiga / SUV', extraCost: 3000 },
    { id: 'crysta', name: 'Innova Crysta', extraCost: 6000 },
    { id: 'tempo', name: 'Tempo Traveller', extraCost: 12000 }
  ];

  // --- MODAL & FORM STATE ---
  showBookingModal = false;
  showTermsModal = false;
  selectedBookingPackage: any = null;
  bookingData = { name: '', phone: '', date: '', guests: 2 };
  minDate: string = new Date().toISOString().split('T')[0];

  // --- UI STATE ---
  openPackages = new Set<string>();
  // Fallback contact info in case API fails
  contactInfo = { phone: '+91 98160 39602', email: 'negiranjeet662@gmail.com' };

  constructor(
    public translate: TranslateService,
    private travelService: TravelDataService,private sanitizer: DomSanitizer
  ) {
    // Keep translation service for RTL support if needed
    this.translate.addLangs(['en', 'hi', 'he']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.loadData();
    // Reload if language changes (optional, if you plan to support multi-lang API later)
    this.translate.onLangChange.subscribe(() => this.loadData());
  }

  loadData() {
    this.travelService.getAllData().subscribe({
      next: (data: any) => {
        // 1. General Config
        this.operatorName = data.OPERATOR_NAME || 'RTS Travels';
        this.tagline = data.TAGLINE || '';
        this.siteTitles = data.TITLES || { EXPLORE: 'Explore Packages', TESTIMONIALS: 'Testimonials', DAILY_SCHEDULE: 'Itinerary', CONTACT: 'Contact' };
        this.siteLabels = data.LABELS || { PRICE: 'Price:', RIGHTS: 'All rights reserved.' };
        this.siteContact = data.CONTACT || { ADDRESS: 'Reckong Peo, Jangal Mehfuza Mehduda C-, Himachal Pradesh 172107' };
 

        // 3. Testimonials
        if (data.TESTIMONIALS) {
          this.testimonials = data.TESTIMONIALS;
        }

        // 4. Tour Packages & Cost Calculation Logic
        if (data.TOUR_PACKAGES && Array.isArray(data.TOUR_PACKAGES)) {
          this.tourPackages = data.TOUR_PACKAGES.map((pkg: any) => {
            let rawCost = pkg.cost;
            // Clean cost string to number
            let baseCost = Number(String(rawCost).replace(/[^0-9.]/g, ''));

            if (!baseCost || isNaN(baseCost)) {
              baseCost = 0;
            }

            return {
              ...pkg,
              baseCost: baseCost,
              carExtraCost: 0,
              totalCost: baseCost,
              selectedCarId: 'sedan'
            };
          });
        }
      },
      error: (err) => {
        console.error('Failed to load API data', err);
      }
    });
    //getbanner
    this.travelService.getBanners().subscribe({
    next: (data: any) => {
      console.log('Raw banner data from API:', data);
      // Logic: If BANNERS comes as an array of documents (your provided JSON)
      if (data && data.length > 0) {
        // Access the first document's BANNERS property
        this.banners = data[0].BANNERS; 
      }
      
      console.log('Successfully mapped banner items:', this.banners);
    }
  });
  }

  // --- PRICING LOGIC ---
  updatePrice(pkg: any, carId: string) {
    const selectedCar = this.carOptions.find(c => c.id === carId);
    if (selectedCar) {
      pkg.selectedCarId = carId;
      pkg.carExtraCost = Number(selectedCar.extraCost);
      pkg.totalCost = pkg.baseCost + pkg.carExtraCost;
    }
  }

  // --- BOOKING FORM ---
  openBooking(pkg: any) {
    this.selectedBookingPackage = pkg;
    this.showBookingModal = true;
    this.bookingData = { name: '', phone: '', date: '', guests: 2 };
  }

  closeBooking() {
    this.showBookingModal = false;
    this.selectedBookingPackage = null;
  }

  submitBooking(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    const car = this.carOptions.find(c => c.id === this.selectedBookingPackage.selectedCarId)?.name;
    const message = `Hello, I want to book:
    Package: ${this.selectedBookingPackage.name}
    Car: ${car}
    Total Price: ${this.selectedBookingPackage.totalCost}
    Name: ${this.bookingData.name}
    Phone: ${this.bookingData.phone}
    Date: ${this.bookingData.date}
    Guests: ${this.bookingData.guests}`;

    window.open(`https://wa.me/919816039602?text=${encodeURIComponent(message)}`, '_blank');
    this.closeBooking();
  }

  // --- UTILS ---
  openTerms() { this.showTermsModal = true; }
  closeTerms() { this.showTermsModal = false; }

  get isRtl(): boolean { return this.translate.currentLang === 'he'; }

  togglePackage(pkgName: string) { this.openPackages.has(pkgName) ? this.openPackages.delete(pkgName) : this.openPackages.add(pkgName); }
  isPackageOpen(pkgName: string): boolean { return this.openPackages.has(pkgName); }
  toggleDay(day: any) { day.expanded = !day.expanded; }

  // --- CAROUSEL LOGIC ---
  @ViewChild('bannerContainer') bannerContainer!: ElementRef;
  slideInterval: any;
  ngAfterViewInit() { this.startAutoSlide(); }
  ngOnDestroy() { this.stopAutoSlide(); }
  startAutoSlide() { this.stopAutoSlide(); this.slideInterval = setInterval(() => { this.scrollToNext(); }, 3000); }
  stopAutoSlide() { if (this.slideInterval) clearInterval(this.slideInterval); }
  pauseAutoSlide() { this.stopAutoSlide(); }
  scrollToNext() {
    if (!this.bannerContainer) return;
    const container = this.bannerContainer.nativeElement;
    const scrollAmount = container.offsetWidth * 0.85;
    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) { container.scrollTo({ left: 0, behavior: 'smooth' }); }
    else { container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' }); }
  }

  // getFullUrl(path: string): string {
  //   if (!path) return 'assets/images/placeholder.jpg';
  //   return path.startsWith('http') ? path : `http://localhost:3000${path}`;
  // }

  getFullUrl(path: string): SafeUrl {
    if (!path) return 'assets/images/placeholder.jpg';
    
    const fullPath = path.startsWith('http') ? path : `http://localhost:3000${path}`;
    
    // Bypass security for this specific local URL
    return this.sanitizer.bypassSecurityTrustUrl(fullPath);
  }
}