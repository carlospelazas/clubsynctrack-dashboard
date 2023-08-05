import { Event } from "@/util/types/event.types";

export async function editSessionReq(id: number, token: string, body: any): Promise<Event> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    return response.json();
}