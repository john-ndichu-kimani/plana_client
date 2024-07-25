import { Permission } from "./permission";

export interface UserRole {
    role_id: string;
    role_name: string;
    description: string;
    permissions: Permission[];
  }
  