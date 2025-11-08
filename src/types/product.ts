export interface PriceStorage {
  storage: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  // price: number;
  priceStorage: PriceStorage[];
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  category: string;
  // price: number;
  priceStorage: PriceStorage[];
  specs: string;
  color: string[];
  intro: string;
  guide: string;
  sku: string;
  tags: string[];
  title: string;
  description: string;
  faq: Faq[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  question: string;
  ans?: string;
  answer?: string;
}
