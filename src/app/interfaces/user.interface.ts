import { EventAttendee } from "./attendee.interface";
import { EventApproval } from "./event.approval";
import { Ticket } from "./ticket.interface";
import { UserProfile } from "./user.profile.interface";

export interface User {
status: any;
    user_id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    is_deleted:Boolean;
    profile_picture_url?: string;
    created_at: Date;
    updated_at: Date;
    events: Event[];
    tickets: Ticket[];
    event_attendees: EventAttendee[];
    notifications: Notification[];
    event_approvals: EventApproval[];
    reports: Report[];
    user_profile: UserProfile;

  }

  export interface Profile{
    username:string;
    email:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    profile_picture_url?:string;
  }


  export interface new_user {
    first_name: string;
    last_name: string;
    username: string,
    email: string,
    phone_number:string,
    password_hash: string
}

export interface login_details {
  email: string;
  password_hash: string;
}

export interface token_details {
 token:string;
 expires_at:Date;
 role: string;
 info?: {
  user_id: string;
  role: string;}
}



