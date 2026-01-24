import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelData, TourPackage, Testimonial } from '../models/travel.model'; // Adjust path

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  
  // Point this to your Node.js server address
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // --- INITIAL DATA LOAD ---
  getAllData(): Observable<TravelData> {
    return this.http.get<TravelData>(`${this.apiUrl}/data`);
  }

  // --- TOUR PACKAGES ---
  
  getTours(): Observable<TourPackage[]> {
    // Appending ?t=timestamp makes every URL unique, forcing a new request
    const uniqueUrl = `${this.apiUrl}/tours?t=${new Date().getTime()}`;
    return this.http.get<TourPackage[]>(uniqueUrl);
  }

  addTour(tour: TourPackage): Observable<any> {
    return this.http.post(`${this.apiUrl}/tours`, tour);
  }

  // Note: We are using array index because your data.json uses a simple array.
  // In a real database (MongoDB), you would use a unique ID (e.g., tour._id).
  updateTour(id: string, tour: TourPackage): Observable<any> {
    return this.http.put(`${this.apiUrl}/tours/${id}`, tour);
  }

  deleteTour(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tours/${id}`);
  }
  // --- TESTIMONIALS ---

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`);
  }

  addTestimonial(testimonial: Testimonial): Observable<any> {
    return this.http.post(`${this.apiUrl}/testimonials`, testimonial);
  }

  // --- CONFIG / SETTINGS ---
  
  updateConfig(configData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/config`, configData);
  }
}