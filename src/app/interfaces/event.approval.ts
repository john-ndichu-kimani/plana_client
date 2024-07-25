import { Event } from "./event.interface";
import { User } from "./user.interface";

export interface EventApproval {
    approval_id: string;
    event_id: string;
    approved_by: string;
    approval_status: string;
    approval_date: Date;
    event: Event;
    approver: User;
  }
