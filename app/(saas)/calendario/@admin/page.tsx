import WeeklyView from "@/components/calendar/WeeklyCalendarView";
import { getAccessToken } from "@/lib/auth/getAccessToken";
import { getMeReq } from "@/lib/auth/getMe";
import { getSessionsByOrgWeekReq } from "@/lib/sessions/getSessionsByOrganizationWeek";
import React from "react";

async function AdminCalendarPage() {
  let eventsResponse;
  let userResponse;
  const token = await getAccessToken();
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  if (!token) {
    return <p>no hay token</p>;
  } else {
    try {
      const { user } = await getMeReq(token.value);
      userResponse = user;
      console.log(user);
      const { events } = await getSessionsByOrgWeekReq(
        token.value,
        user.organization.id,
        currentDate
      );
      console.log(events);

      eventsResponse = events;
    } catch (err: Error | any) {
      throw new Error(err);
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
