import { Routes } from '@angular/router';
import { ItineraryComponent } from './itinerary/itinerary';
import { DetailedItineraryComponent } from './detailed-itinerary/detailed-itinerary';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', component: Layout }, 
  { path: 'detailed-itinerary/:packageName', component: DetailedItineraryComponent }
];