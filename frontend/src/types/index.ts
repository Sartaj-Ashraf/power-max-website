export interface Product {
  _id: string;
  name: string;
  category: 'inverters' | 'batteries' | 'solar-panels';
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  specifications: Record<string, string>;
  features: string[];
  warranty: string;
  stock: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface Enquiry {
  _id: string;
  productId: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
