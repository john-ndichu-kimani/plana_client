import { User } from "./user.interface";

export interface Report {
    report_id: string;
    generated_by: string;
    report_type: string;
    report_data: string;
    created_at: Date;
    generator: User;
  }
  