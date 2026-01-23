import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-itinerary',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'],
})  
export class ItineraryComponent {
  operatorName = 'RTS travels';
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
    }
  ];

 // Inside your component class:

// 1. Add 'cost' to your existing tourPackages array
tourPackages = [
  {
    name: 'Spiti Valley Adventure',
    cost: 15000,  // Add this field (number format allows pipes to work)
    itinerary: ['Day 1: Shimla', 'Day 2: Chitkul', 'Day 3: Kaza']
  },
  {
    name: 'Manali Weekend',
    cost: 8000,   // Add this field
    itinerary: ['Day 1: Solang Valley', 'Day 2: Rohtang Pass']
  }
];

// 2. Add this new object for the Contact Section
contactInfo = {
  address: '123 Mountain View Road, Manali, HP, India',
  phone: '+91 98160 39602',
  email: 'negiranjeet662@gmail.com'
};

  testimonials = [
    { text: 'The Ranjeet taxi services was breathtaking! Highly recommend.', author: 'John Doe' },
    { text: 'Loved the cultural tour, especially the local markets.', author: 'Jane Smith' },
    { text: 'A once-in-a-lifetime experience. Everything was perfect!', author: 'Emily Johnson' }
  ]; 
}