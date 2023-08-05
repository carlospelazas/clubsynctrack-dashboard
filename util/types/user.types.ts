import { Media } from "./media.types";
import { UserRole } from "./user-role.types";

export interface IUser {
    id: number;
    email: string;
    username: string;
    role: UserRole;
    profilePicture: Media | null;
    organization: Organization;
}

export interface Organization {
    id: number;
    name: string;
}