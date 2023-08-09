import MonthlyCalendarView from "@/components/calendar/MonthlyCalendarView";
import { getAccessToken } from "@/lib/auth/getAccessToken";
import { getMeReq } from "@/lib/auth/getMe";
import { getSessionsByOrgMonthReq } from "@/lib/sessions/getSessionsByOrganizationMonth";
import React from "react";

async function AdminCalendarMesPage() {
  const token = await getAccessToken();
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  let userResponse;
  let eventsResponse;
  if (!token) {
    return <p>no hay token</p>;
  } else {
    try {
      const { user } = await getMeReq(token.value);
      userResponse = user;
      const orgId = user.organization.id;

      const response = await getSessionsByOrgMonthReq(
        token.value,
        orgId,
        currentDate
      );
      const { events } = response;
      eventsResponse = events;
    } catch (err: Error | any) {
      throw new Error(err);
    }
  }
  if (!eventsResponse) {
    return <p>Error cierra y vuelve a abrir la aplicacion</p>;
  }
  return (
    <div className="pt-8">
      <MonthlyCalendarView
        events={eventsResponse}
        orgId={userResponse.organization.id}
      />
    </div>
  );
}

export default AdminCalendarMesPage;
