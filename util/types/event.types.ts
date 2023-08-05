import { Group } from "./groups.types";
import { IUser } from "./user.types";

export interface Event {
    id: number;
    name: string;
    startHour: string;
    duration: number;
    dates: SessionDate[];
    group: Group;
    color: string;
  }

export interface SessionDate {
    id: number;
    date: string;
}

export interface Teacher {
    id: number;
    salary: number;
    type: string;
    birthdate: string;
    firstname: string;
    lastname: string;
    telephone: string;
    user: IUser;
}

export interface createEventDto {
    name: string;
    startHour: string;
    duration: number;
    dates: createDatesDto[];
    group: number;
    color: string;
}

export interface createDatesDto {
    date:string,
}