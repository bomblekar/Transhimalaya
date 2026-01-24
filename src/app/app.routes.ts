import { Routes } from '@angular/router';
import { ItineraryComponent } from './itinerary/itinerary';
import { DetailedItineraryComponent } from './detailed-itinerary/detailed-itinerary';
import { Layout } from './layout/layout';
import { AdminToursComponent } from './admin-tours/admin-tours';
import { AdminConfigComponent } from './admin-config/admin-config';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: Layout }, 
  { path: 'login', component: LoginComponent },
  // { path: /'detailed-itinerary/:packageName', component: DetailedItineraryComponent }
  { path: 'admin', component: AdminToursComponent, canActivate: [authGuard] },
  { path: 'admin-config', component: AdminConfigComponent }
];