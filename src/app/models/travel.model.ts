export interface ItineraryDay {
    day: string;
    title: string;
    details: string;
  }
export interface ItineraryItem {
  day: string;
  title: string;
  details: string;
  image?: string; // Optional sightseeing image URL
}

export interface TourPackage {
  _id?: string;
  name: string;
  cost: string;  // Optional Hero image URL
  itinerary: ItineraryItem[];
  images: string[]; // Additional image URLs
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