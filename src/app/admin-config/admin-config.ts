import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelDataService } from '../services/travel-data.service';

@Component({
  selector: 'app-admin-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-config.html',
  styleUrls: ['./admin-config.css']
})
export class AdminConfigComponent implements OnInit {

  isLoading = false;
  isSaving = false;

  // Initialize with empty structure to prevent "undefined" errors
  config: any = {
    OPERATOR_NAME: '',
    TAGLINE: '',
    BTN_LANG: '',
    TITLES: { EXPLORE: '', TESTIMONIALS: '', DAILY_SCHEDULE: '', CONTACT: '' },
    LABELS: { PRICE: '', RIGHTS: '' },
    CONTACT: { ADDRESS: '' }
  };

  constructor(private travelService: TravelDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.travelService.getAllData().subscribe({
      next: (data: any) => {
        // Merge incoming data into our config object
        this.config = { ...this.config, ...data };
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading config', err);
        this.isLoading = false;
      }
    });
  }

  saveConfig() {
    this.isSaving = true;
    
    // We send the whole config object. 
    // The backend logic we wrote in Step 1 handles the merging.
    this.travelService.updateConfig(this.config).subscribe({
      next: () => {
        alert('Settings saved successfully!');
        this.isSaving = false;
      },
      error: (err) => {
        alert('Failed to save settings.');
        console.error(err);
        this.isSaving = false;
      }
    });
  }
}