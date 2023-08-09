import WeeklyView from "@/components/calendar/WeeklyCalendarView";
import { getAccessToken } from "@/lib/auth/getAccessToken";
import { getMeReq } from "@/lib/auth/getMe";
import { getSessionsByOrgReq } from "@/lib/auth/getSessionsByOrganization";
import React from "react";

async function AdminCalendarPage() {
  let eventsResponse;
  let userResponse;
  const token = await getAccessToken();
  if (!token) {
    return <p>no hay token</p>;
  } else {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const currentDate = `${year}-${month}-${day}`;

      const { user } = await getMeReq(token.value);
      userResponse = user;
      const { events } = await getSessionsByOrgReq(
        token.value,
        user.organization.id,
        currentDate
      );

      eventsResponse = events;
    } catch (err) {
      throw new Error("error");
    }
  }
  if (!eventsResponse) {
    return <p>Error recarga</p>;
  }

  return (
    <WeeklyView events={eventsResponse} orgId={userResponse.organization.id} />
  );
}

export default AdminCalendarPage;
