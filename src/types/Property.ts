export interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  type: string;
  status: string;
  office: string;
  features?: string[];
  description?: string;
  images: string[];
  date: string;
}
