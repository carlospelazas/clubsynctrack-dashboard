import WeeklyView from "@/components/calendar/WeeklyCalendarView";
import { getAccessToken } from "@/lib/auth/getAccessToken";
import { getMeReq } from "@/lib/auth/getMe";
import { getSessionsByOrgReq } from "@/lib/auth/getSessionsByOrganization";
import React from "react";

async function AdminCalendarPage() {
  let eventsResponse;
  const token = await getAccessToken();
  if (!token) {
    return <p>no hay token</p>;
  } else {
    try {
      const { user } = await getMeReq(token.value);
      const { events } = await getSessionsByOrgReq(
        token.value,
        user.organization.id
      );
      eventsResponse = events;
    } catch (err) {
      throw new Error("error");
    }
  }
  if (!eventsResponse) {
    return <p>Error recarga</p>;
  }

  return <WeeklyView events={eventsResponse} />;
}

export default AdminCalendarPage;
