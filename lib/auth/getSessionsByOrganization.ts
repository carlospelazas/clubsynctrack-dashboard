import { Event } from "@/util/types/event.types";

export async function getSessionsByOrgReq(
    token: string,
    orgId: number,
  ): Promise<{ events: Event[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/organization/${orgId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const events = await res.json();
      return {events};
    }
    throw new Error(await res.text());
  }