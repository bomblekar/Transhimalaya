// src/app/services/tour.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router'; 
import { map } from 'rxjs';
import { TravelDataService } from '../services/travel-data.service';

export const tourResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const travelService = inject(TravelDataService);
  const id = route.paramMap.get('id');
  
  // We fetch all data and return just the specific tour
  return travelService.getAllData().pipe(
    map((data: any) => {
      const tour = data.TOUR_PACKAGES?.find((p: any) => p._id === id);
      const banners = data.BANNERS || [];
      return { tour, banners };
    })
  );
};