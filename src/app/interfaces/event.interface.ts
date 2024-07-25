import { EventAttendee } from './attendee.interface';
import { EventApproval } from './event.approval';
import { EventStatistic } from './event.statistics.interface';
import { Ticket } from './ticket.interface';
import { User } from './user.interface';

export interface Event {
  
  event_id: string;
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  created_by: string;
  created_at: Date;
  updated_at: Date;
  images: string;
  capacity: number;
  tickets?: Ticket[];
  event_attendees?: EventAttendee[];
  notifications?: Notification[];
  event_statistics?: EventStatistic;
  event_approvals?: EventApproval[];
  createdBy: User;
}
