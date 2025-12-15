export interface Apartment {
  id: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  images: string[];
  coverImage: string;
  amenities: string[];
  houseRules: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  apartmentId: string;
  apartmentName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: ReservationStatus;
  notes?: string;
  paymentDeadline?: string;
  createdAt: string;
  updatedAt: string;
  timeline: ReservationTimelineEvent[];
}

export type ReservationStatus = 
  | 'pending'
  | 'payment_pending'
  | 'confirmed'
  | 'cancelled'
  | 'expired';

export interface ReservationTimelineEvent {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface SearchFilters {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: 'reservation' | 'apartment' | 'settings';
  entityId: string;
  userId: string;
  userEmail: string;
  details?: string;
  timestamp: string;
}

export interface Settings {
  bankAccount: string;
  iban: string;
  currency: string;
  paymentDeadlineDays: number;
  emailTemplates: {
    reservationReceived: string;
    paymentInstructions: string;
    reservationConfirmed: string;
    reservationCancelled: string;
  };
}
