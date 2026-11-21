export type Service = {
  name: string;
  price: number; // so'mda
};

export type Tailor = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  telegram?: string;
  address: string;
  lat: number;
  lng: number;
  bio: string;
  experienceYears: number;
  rating: number;
  reviewsCount?: number;
  verified?: boolean;
  categories: string[]; // Category id'lari
  services: Service[];
  portfolio: string[];
};

export type TailorWithDistance = Tailor & { distanceKm?: number };

export type Category = {
  id: string;
  name: string;
  icon: string; // lucide-react ikonka nomi
};

export type TailorFilters = {
  search?: string;
  category?: string;
  minRating?: number;
  lat?: number;
  lng?: number;
  sortBy?: "distance" | "rating";
};


export type User = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type LoginPayload = {
  phone: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
  role: UserRole;
};

export type UserRole = "client" | "tailor" | "admin";