
import { Event } from "./event.interface";
import { User } from "./user.interface";
import { EventAttendee } from "./attendee.interface";
import { BookingHistory } from "./booking.history.interface";

export interface Ticket {
  ticket_id: string;
  event_id?: string;
  user_id?: string;
  booking_status: string;
  price: number;
  ticket_type: string;
  image?:string;
  booking_date: Date;
  group_size?:string;
  // Relationships
  event?: Event;
  user?: User;
  event_attendees?: EventAttendee[];
  booking_history?: BookingHistory[];
}
