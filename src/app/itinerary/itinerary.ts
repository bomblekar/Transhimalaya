import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule], 
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'],
})
export class ItineraryComponent implements OnInit, AfterViewInit, OnDestroy {
  
  tourPackages: any[] = [];
  banners: any[] = [];
  testimonials: any[] = [];

  carOptions = [
    { id: 'sedan', name: 'Sedan (Dzire/Etios)', extraCost: 0 },
    { id: 'ertiga', name: 'Ertiga / SUV', extraCost: 3000 },
    { id: 'crysta', name: 'Innova Crysta', extraCost: 6000 },
    { id: 'tempo', name: 'Tempo Traveller', extraCost: 12000 }
  ];

  showBookingModal = false;
  showTermsModal = false;
  selectedBookingPackage: any = null;
  
  // Initialize booking data
  bookingData = { name: '', phone: '', date: '', guests: 2 };
  
  // Get today's date for "min" attribute in date picker
  minDate: string = new Date().toISOString().split('T')[0];

  openPackages = new Set<string>();
  contactInfo = { phone: '+91 98160 39602', email: 'negiranjeet662@gmail.com' };

  languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'he', label: 'עברית (Hebrew)' }
  ];

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'hi', 'he']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.loadData();
    this.translate.onLangChange.subscribe(() => this.loadData());
  }

  loadData() {
    this.translate.get('TOUR_PACKAGES').subscribe(data => {
      if (data && Array.isArray(data)) {
        this.tourPackages = data.map((pkg: any) => {
          let rawCost = pkg.cost;
          let baseCost = Number(String(rawCost).replace(/[^0-9.]/g, ''));
          
          if (!baseCost || isNaN(baseCost)) {
            console.warn(`Missing cost for ${pkg.name}, defaulting to 0`);
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
    });

    this.translate.get('BANNERS').subscribe(data => this.banners = data);
    this.translate.get('TESTIMONIALS').subscribe(data => this.testimonials = data);
  }

  updatePrice(pkg: any, carId: string) {
    const selectedCar = this.carOptions.find(c => c.id === carId);
    if (selectedCar) {
      pkg.selectedCarId = carId;
      pkg.carExtraCost = Number(selectedCar.extraCost);
      pkg.totalCost = pkg.baseCost + pkg.carExtraCost;
    }
  }

  openBooking(pkg: any) { 
    this.selectedBookingPackage = pkg; 
    this.showBookingModal = true; 
    // Reset form data on open
    this.bookingData = { name: '', phone: '', date: '', guests: 2 };
  }

  closeBooking() { 
    this.showBookingModal = false; 
    this.selectedBookingPackage = null; 
  }

  // Updated Submit to handle Form Validation
  submitBooking(form: NgForm) {
    if (form.invalid) {
      // Mark all controls as touched to trigger error messages
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

  openTerms() { this.showTermsModal = true; }
  closeTerms() { this.showTermsModal = false; }
  get isRtl(): boolean { return this.translate.currentLang === 'he'; }
  switchLanguage(langCode: string) { this.translate.use(langCode); }
  togglePackage(pkgName: string) { this.openPackages.has(pkgName) ? this.openPackages.delete(pkgName) : this.openPackages.add(pkgName); }
  isPackageOpen(pkgName: string): boolean { return this.openPackages.has(pkgName); }
  toggleDay(day: any) { day.expanded = !day.expanded; }
  
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
}