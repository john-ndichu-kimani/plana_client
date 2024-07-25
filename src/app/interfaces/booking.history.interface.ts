import { Ticket } from "./ticket.interface";
import { User } from "./user.interface";

export interface BookingHistory {
  history_id: string;
  user_id: string;
  event_id: string;
  ticket_id: string;
  booking_date: Date;
  status: string;
  is_deleted: boolean;
    user?: User;
    event?: Event;
    ticket?: Ticket;
  }
