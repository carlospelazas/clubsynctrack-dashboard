import ToggleView from "@/components/calendar/ToggleView";
import { getUserFromApi } from "@/lib/auth/getUserFromApi";
import React, { useEffect } from "react";

export default async function CalendarLayout(props: {
  children: React.ReactNode;
  teacher: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { user, error } = await getUserFromApi();

  if (user?.role === "teacher") return <div>{props.teacher}</div>;
  else
    return (
      <main className="h-full w-full  md:px-16 px-8 py-7">
        <div className=" mb-5">
          <p className="text-3xl font-bold">Calendario</p>
        </div>
        <ToggleView />
        <div>{props.admin}</div>
      </main>
    );
}
