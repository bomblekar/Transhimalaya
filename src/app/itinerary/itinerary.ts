import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'],
})
export class ItineraryComponent implements AfterViewInit, OnDestroy {
  operatorName = 'RTS Travels';
  
  // Track ONLY the name of the currently open package
  openPackageName: string | null = null; 

  // Banner Auto-Scroll Logic
  @ViewChild('bannerContainer') bannerContainer!: ElementRef;
  slideInterval: any;

  ngAfterViewInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.stopAutoSlide(); 
    this.slideInterval = setInterval(() => {
      this.scrollToNext();
    }, 3000); 
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  pauseAutoSlide() {
    this.stopAutoSlide();
  }

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

  contactInfo = {
    address: '123 Mountain View Road, Manali, HP, India',
    phone: '+91 98160 39602',
    email: 'negiranjeet662@gmail.com'
  };

  banners = [
    {
      image: 'assets/images/banner1.jpg',
      title: 'Discover the Himalayas',
      subtitle: 'Experience the adventure of a lifetime',
      alt: 'Himalayas Banner'
    },
    {
      image: 'assets/images/banner2.jpg',
      title: 'Cultural Wonders',
      subtitle: 'Immerse yourself in rich traditions',
      alt: 'Cultural Tour Banner'
    },
    {
      image: 'assets/images/banner3.jpg',
      title: 'Road Trips',
      subtitle: 'Drive through the worlds highest passes',
      alt: 'Road Trip Banner'
    }
  ];

  tourPackages = [
    {
      name: 'Spiti Valley Adventure',
      cost: 32000,
      itinerary: [
        { 
          day: 'Day 1', 
          title: 'Shimla ➝ Chitkul', 
          details: `Scenic drive via Rampur & Sangla Valley. Visit Rakcham & Baspa River. Overnight stay at Chitkul (Last village of India).`, 
          expanded: false 
        },
        { 
          day: 'Day 2', 
          title: 'Chitkul ➝ Kalpa', 
          details: `Drive through Sangla Valley. Visit Kalpa village & Kinnaur Kailash views. Local sightseeing & sunset view. Overnight stay at Kalpa.`, 
          expanded: false 
        },
        { 
          day: 'Day 3', 
          title: 'Kalpa ➝ Tabo', 
          details: `En-route Khab Sangam, Nako Lake & Geyu Mummy. Visit Tabo Monastery (UNESCO site). Overnight stay at Tabo.`, 
          expanded: false 
        },
        { 
          day: 'Day 4', 
          title: 'Tabo ➝ Kaza', 
          details: `Visit Dhankar Monastery & Lake. Reach Kaza, the heart of Spiti. Overnight stay at Kaza.`, 
          expanded: false 
        },
        { 
          day: 'Day 5', 
          title: 'Kaza Local Sightseeing', 
          details: `Visit Key Monastery, Kibber, Langza, Hikkim (World's highest post office), and Komic. Overnight stay at Kaza.`, 
          expanded: false 
        },
        { 
          day: 'Day 6', 
          title: 'Kaza ➝ Losar', 
          details: `Scenic drive through cold desert landscapes. Relax and acclimatize. Overnight stay at Losar.`, 
          expanded: false 
        },
        { 
          day: 'Day 7', 
          title: 'Losar ➝ Manali (Drop)', 
          details: `Cross Kunzum Pass. Drive via Chandratal route (weather permitting). Drop at Manali.`, 
          expanded: false 
        }
      ]
    },
    {
      name: 'Magical Kinnaur',
      cost: 22000,
      itinerary: [
        { 
          day: 'Day 1', 
          title: 'Shimla ➝ Sarahan', 
          details: `Distance: ~170 km | 6–7 hrs. En-route sightseeing: Rampur Bushahr, Sutlej River views. Visit: Bhimakali Temple. Overnight stay: Sarahan.`, 
          expanded: false 
        },
        { 
          day: 'Day 2', 
          title: 'Sarahan ➝ Chitkul', 
          details: `Distance: ~170 km | 6–7 hrs. En-route sightseeing: Karcham Dam, Sangla Valley, Rakchham. Visit: Last Indian Village – Chitkul, Baspa River. Overnight stay: Chitkul.`, 
          expanded: false 
        },
        { 
          day: 'Day 3', 
          title: 'Chitkul ➝ Kalpa', 
          details: `Distance: ~90 km | 4–5 hrs. En-route sightseeing: Sangla, Karcham, Roghi Village. Visit: Suicide Point, Apple Orchards. Overnight stay: Kalpa.`, 
          expanded: false 
        },
        { 
          day: 'Day 4', 
          title: 'Kalpa Local Sightseeing', 
          details: `Visit: Kinnaur Kailash View Point, Kalpa Monastery, Peo Market. Enjoy scenic village walks & photography. Overnight stay: Kalpa.`, 
          expanded: false 
        },
        { 
          day: 'Day 5', 
          title: 'Kalpa ➝ Shimla (Drop)', 
          details: `Distance: ~230 km | 8–9 hrs. Return via Reckong Peo – Rampur. Tour ends with beautiful mountain memories.`, 
          expanded: false 
        }
      ]
    }
  ];

  testimonials = [
    { text: 'The Ranjeet taxi services was breathtaking! Highly recommend.', author: 'John Doe' },
    { text: 'Loved the cultural tour, especially the local markets.', author: 'Jane Smith' },
    { text: 'A once-in-a-lifetime experience. Everything was perfect!', author: 'Emily Johnson' }
  ];

  toggleDay(day: any) {
    day.expanded = !day.expanded;
  }

  togglePackage(pkgName: string) {
    if (this.openPackageName === pkgName) {
      this.openPackageName = null;
    } else {
      this.openPackageName = pkgName;
    }
  }
}