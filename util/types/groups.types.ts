import { Teacher } from "./event.types";

export interface GroupsResponseNoTeachers {
    ageGroup: string;
    endDate: string;
    id: number;
    name: string;
    price: number;
    startDate: string;
    type: string;
}

export interface Group {
    id: number;
    name: string;
    ageGroup: string;
    type: string;
    startDate: string;
    endDate: string;
    price: number;
    teachers: Teacher[];
}