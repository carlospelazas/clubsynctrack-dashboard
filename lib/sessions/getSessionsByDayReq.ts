import { Event } from "@/util/types/event.types";

export async function getSessionsByDayReq(token: string, orgId:number, currentDate:string): Promise<Event> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/organization/some/${orgId}?date=${currentDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        next: {
            revalidate: 10
        }
    })
    return response.json();
}