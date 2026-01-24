export interface ItineraryDay {
    day: string;
    title: string;
    details: string;
  }
  
  export interface TourPackage {
    _id?: string; // <--- ADD THE '?' HERE. This fixes the error.
    name: string;
    cost: string;
    itinerary: ItineraryDay[];
    
    // Optional frontend properties (for pricing logic)
    baseCost?: number;
    carExtraCost?: number;
    totalCost?: number;
    selectedCarId?: string;
  }
  
  export interface Testimonial {
    text: string;
    author: string;
  }
  
  // Full Data Structure (for the initial load)
  export interface TravelData {
    OPERATOR_NAME: string;
    TAGLINE: string;
    TOUR_PACKAGES: TourPackage[];
    TESTIMONIALS: Testimonial[];
    // ... add other fields if needed
  }