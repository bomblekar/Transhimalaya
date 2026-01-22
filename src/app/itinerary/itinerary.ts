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

  tourPackages = [
    {
      name: 'Kinnaur Valley Expedition',
      itinerary: [
        'Day 1: Shimla ➝ Sarahan (~170 km). Visit Bhimakali Temple.',
        'Day 2: Sarahan ➝ Chitkul (~170 km). Visit Last Indian Village & Baspa River.',
        'Day 3: Chitkul ➝ Kalpa (~90 km). Visit Suicide Point & Roghi Village.',
        'Day 4: Kalpa Local Sightseeing. Kinnaur Kailash View Point & Monastery.',
        'Day 5: Kalpa ➝ Shimla (~230 km). Return journey via Rampur.'
      ]
    },
    {
      name: 'Spiti Valley Circuit (Shimla to Manali)',
      itinerary: [
        'Day 1: Shimla ➝ Chitkul. Scenic drive via Sangla Valley & Baspa River.',
        'Day 2: Chitkul ➝ Kalpa. Views of Kinnaur Kailash & sunset.',
        'Day 3: Kalpa ➝ Tabo. Visit Nako Lake, Geyu Mummy & Tabo Monastery.',
        'Day 4: Tabo ➝ Kaza. Visit Dhankar Monastery & Dhankar Lake.',
        'Day 5: Kaza Sightseeing. Key Monastery, Hikkim (Highest Post Office) & Komic.',
        'Day 6: Kaza ➝ Losar. Scenic drive through cold desert landscapes.',
        'Day 7: Losar ➝ Manali. Cross Kunzum Pass & Chandratal route.'
      ]
    }
  ];

  testimonials = [
    { text: 'The Ranjeet taxi services was breathtaking! Highly recommend.', author: 'John Doe' },
    { text: 'Loved the cultural tour, especially the local markets.', author: 'Jane Smith' },
    { text: 'A once-in-a-lifetime experience. Everything was perfect!', author: 'Emily Johnson' }
  ];
}