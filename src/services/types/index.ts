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
  workingHours?: WorkingHours;
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

export type Review = {
  id: string;
  tailorId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
};

export type ReviewPayload = {
  tailorId: string;
  rating: number;
  comment: string;
};

export type OrderStatus = "new" | "accepted" | "rejected" | "done";

export type Order = {
  id: string;
  tailorId: string;
  tailorName: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  service: string;
  description: string;
  budget?: number;
  dueDate?: string; // YYYY-MM-DD
  status: OrderStatus;
  createdAt: string;
};

export type OrderPayload = {
  tailorId: string;
  tailorName: string;
  service: string;
  description: string;
  budget?: number;
  dueDate?: string;
};

export type DaySchedule = {
  open: boolean;
  from: string; // "09:00"
  to: string; // "18:00"
};

// 7 ta element: 0 = Dushanba ... 6 = Yakshanba
export type WorkingHours = DaySchedule[];