import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TravelDataService } from '../services/travel-data.service';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-itinerary-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,Footer],
  templateUrl: './detailed-itinerary.html',
  styleUrls: ['./detailed-itinerary.css']
})
export class DetailedItineraryComponent implements OnInit, OnDestroy {
  tour: any = null;
  currentBannerIndex = 0;
  bannerInterval: any;
  // Base URL for your Node.js backend to resolve local /uploads paths
  readonly API_URL = 'http://localhost:3000'; 

  constructor(private route: ActivatedRoute, public travelService: TravelDataService,private cdr: ChangeDetectorRef) {}

 ngOnInit() {
    const data = this.route.snapshot.data['tourData'];
    if (data && data.tour) {
      this.tour = data.tour;
      this.startBannerSlideshow();
    }
  }

  // Resolves the path saved in Node.js to a full URL for the browser
  getFullUrl(path: string): string {
    if (!path) return 'assets/images/placeholder.jpg';
    return path.startsWith('http') ? path : `${this.API_URL}${path}`;
  }

startBannerSlideshow() {
    if (this.tour?.images?.length > 1) {
      // Clear any existing interval first to prevent double-starts
      if (this.bannerInterval) clearInterval(this.bannerInterval);

      this.bannerInterval = setInterval(() => {
        this.currentBannerIndex = (this.currentBannerIndex + 1) % this.tour.images.length;
        this.cdr.detectChanges(); // Manually trigger UI refresh
      }, 5000);
    }
  }

ngOnDestroy() {
  if (this.bannerInterval) {
    console.log('Cleaning up slideshow interval');
    clearInterval(this.bannerInterval);
  }
}
}