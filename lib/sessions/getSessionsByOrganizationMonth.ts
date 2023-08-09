import { Event } from "@/util/types/event.types";

export async function getSessionsByOrgMonthReq(
    token: string,
    orgId: number,
    currentDate: string
  ): Promise<{ events: Event[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/organization/month/${orgId}?date=${currentDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        revalidate: 10
      }
    });
    if (res.status === 200) {
      const events = await res.json();
      return {events};
    }
    throw new Error(await res.text());
  }