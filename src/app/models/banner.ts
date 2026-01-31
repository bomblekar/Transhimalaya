export interface Banner {
  _id?: string;      // MongoDB unique identifier
  title: string;     // Heading shown on the hero slide
  subtitle: string;  // Description text
  image: string;     // Relative path (e.g., /uploads/banners/hero.jpg) 
}