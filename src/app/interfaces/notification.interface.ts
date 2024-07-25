import { User } from "./user.interface";

export interface Notification {
    notification_id: string;
    recipient_id: string;
    event_id?: string;
    message: string;
    sent_at: Date;
    notification_type: string;
    recipient: User;
    event?: Event;
  }
  