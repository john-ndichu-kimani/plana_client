import { UserRole } from "./role.interface";

export interface Permission {
    permission_id:string;
    role_id?: string;
    permission_name: string;
    description: string;
    role?: UserRole;
  }
  