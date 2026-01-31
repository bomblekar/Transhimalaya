// admin-tours.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelDataService } from '../services/travel-data.service';
import { Auth } from '../services/auth';
import { TourPackage } from '../models/travel.model';

@Component({
  selector: 'app-admin-tours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tours.html',
  styleUrls: ['./admin-tours.css']
})
export class AdminToursComponent implements OnInit {
  tours: TourPackage[] = [];
  isEditing = false;
  isLoading = false;
  submitted = false;

  currentTour: TourPackage = {
    name: '',
    cost: '',
    images: [], // Initialized for multiple images
    itinerary: []
  };

  constructor(
    private travelService: TravelDataService,
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { this.loadTours(); }
  logout() {
    this.authService.logout(); // Clears token
    this.router.navigate(['/login']); // Redirects to login
  }
  loadTours() {
    this.isLoading = true;
    this.travelService.getTours().subscribe({
      next: (data: any) => {
        this.tours = data.TOUR_PACKAGES || data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => this.isLoading = false
    });
  }

  // --- SAVE WITH VALIDATION ---
  saveTour() {
    this.submitted = true;

    // VALIDATION: Ensure name, cost, itinerary, and at least one image exist
    const isImageUploaded = this.currentTour.images && this.currentTour.images.length > 0;

    if (!this.currentTour.name ||
      !this.currentTour.cost ||
      this.currentTour.itinerary.length === 0 ||
      !isImageUploaded) {
      return; // Stop if at least one image is missing
    }

    const request = this.isEditing && this.currentTour._id
      ? this.travelService.updateTour(this.currentTour._id, this.currentTour)
      : this.travelService.addTour(this.currentTour);

    request.subscribe({
      next: () => {
        alert(this.isEditing ? 'Tour updated successfully' : 'Tour added successfully');
        this.resetForm();
        this.loadTours();
      },
      error: () => alert('Operation failed')
    });
  }

  // --- MULTIPLE IMAGE UPLOAD ---
  // admin-tours.ts
  onMultipleFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('name', this.currentTour.name); // Still needed for the folder name

      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]); // Just append the files
      }

      this.travelService.uploadMultipleImages(formData).subscribe({
        next: (res: any) => {
          // Backend returns the full URLs with 'banner-X' names
          this.currentTour.images = [...this.currentTour.images, ...res.urls];
        }
      });
    }
  }
  removeImage(index: number) {
    this.currentTour.images.splice(index, 1);
  }

  deleteTour(tour: TourPackage) {
    if (!tour._id) return;
    if (confirm(`Are you sure you want to delete "${tour.name}"?`)) {
      this.travelService.deleteTour(tour._id).subscribe({
        next: () => this.loadTours(),
        error: () => alert('Failed to delete tour.')
      });
    }
  }

  editTour(tour: TourPackage) {
    this.isEditing = true;
    this.submitted = false;
    this.currentTour = JSON.parse(JSON.stringify(tour));
  }

  addDay() {
    const nextDayNum = this.currentTour.itinerary.length + 1;
    this.currentTour.itinerary.push({
      day: `Day ${nextDayNum}`,
      title: '',
      details: ''
      // Day-wise image property removed
    });
  }

  // ... other existing methods (deleteTour, editTour, logout)
  removeDay(index: number) {
    this.currentTour.itinerary.splice(index, 1);
  }

  resetForm() {
    this.isEditing = false;
    this.submitted = false;
    this.currentTour = {
      name: '',
      cost: '',
      images: [],
      itinerary: []
    };
  }
}