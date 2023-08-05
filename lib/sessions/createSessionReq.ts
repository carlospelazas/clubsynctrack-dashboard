import { Event } from "@/util/types/event.types";

export async function createSessionReq(token: string, body: any): Promise<Event> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    return response.json();
}