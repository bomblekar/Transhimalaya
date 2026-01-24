import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; // <--- Import Router
import { TravelDataService } from '../services/travel-data.service'; 
import { Auth } from '../services/auth'; // <--- Import Auth Service
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
  
  currentTour: TourPackage = {
    name: '',
    cost: '',
    itinerary: []
  };

  isEditing = false;
  isLoading = false;
  submitted = false; 

  constructor(
    private travelService: TravelDataService, 
    private authService: Auth, // <--- Inject Auth Service
    private router: Router,           // <--- Inject Router
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTours();
  }

  // --- LOGOUT FUNCTION ---
  logout() {
    this.authService.logout(); // Clears token
    this.router.navigate(['/login']); // Redirects to login
  }

  // --- 1. LOAD ---
  loadTours() {
    this.isLoading = true;
    this.travelService.getTours().subscribe({
      next: (data: any) => {
        this.tours = data.TOUR_PACKAGES || data;
        if (!this.tours) this.tours = [];
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Error loading tours", err);
        this.isLoading = false;
      }
    });
  }

  // --- 2. SUBMIT ---
  saveTour() {
    this.submitted = true; 
    const isNameValid = !!this.currentTour.name;
    const isCostValid = !!this.currentTour.cost;
    const isItineraryValid = this.currentTour.itinerary.length > 0;

    if (!isNameValid || !isCostValid || !isItineraryValid) return; 

    if (this.isEditing) {
      if (this.currentTour._id) {
        this.travelService.updateTour(this.currentTour._id, this.currentTour).subscribe({
          next: () => {
            alert('Tour updated successfully');
            this.resetForm();
            this.loadTours();
          },
          error: () => alert('Failed to update tour')
        });
      } else {
        alert("Error: Cannot update tour without ID");
      }
    } else {
      this.travelService.addTour(this.currentTour).subscribe({
        next: () => {
          alert('Tour added successfully');
          this.resetForm();
          this.loadTours();
        },
        error: () => alert('Failed to add tour')
      });
    }
  }

  // --- 3. DELETE ---
  deleteTour(tour: TourPackage) {
    if (!tour._id) return;
    if (confirm(`Are you sure you want to delete "${tour.name}"?`)) {
      this.travelService.deleteTour(tour._id).subscribe({
        next: () => this.loadTours(),
        error: () => alert('Failed to delete tour.')
      });
    }
  }

  // --- 4. PREPARE EDIT ---
  editTour(tour: TourPackage) {
    this.isEditing = true;
    this.submitted = false; 
    this.currentTour = JSON.parse(JSON.stringify(tour)); 
  }

  // --- 5. ITINERARY ---
  addDay() {
    const nextDayNum = this.currentTour.itinerary.length + 1;
    this.currentTour.itinerary.push({ day: `Day ${nextDayNum}`, title: '', details: '' });
  }

  removeDay(index: number) {
    this.currentTour.itinerary.splice(index, 1);
  }

  resetForm() {
    this.isEditing = false;
    this.submitted = false;
    this.currentTour = { name: '', cost: '', itinerary: [] };
  }
}