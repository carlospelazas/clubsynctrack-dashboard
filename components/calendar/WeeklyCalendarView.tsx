"use client";
import { calculateEndHour } from "@/lib/util/timeUtils";
import { getColorHexadecimal } from "@/util/types/colors.enum";
import { Event } from "@/util/types/event.types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomModal from "../reusable/CustomModal";
import axios from "axios";
import SeeSessionModal from "./SeeSessionModal";
import EditSessionModal from "./EditSessionModal";
import CreateSessionModal from "./CreateSessionModal";

interface WeeklyViewProps {
  events: Event[];
  orgId: number;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ events, orgId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [seeDetailsOpen, setSeeDetailsOpen] = useState(false);
  const [editSessionOpen, setEditSessionOpen] = useState(false);
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeSessions, setActiveSessions] = useState<Event[]>(events);

  const handleActiveSessions = (sessions: Event[]) => {
    setActiveSessions(sessions);
  };

  const closeAddSessionModal = () => {
    setAddSessionOpen(false);
  };

  const openSeeDetailsModal = (session: Event) => {
    setSeeDetailsOpen(true);
    setSelectedEvent(session);
  };

  useEffect(() => {
    console.log(activeSessions);
  }, [activeSessions]);

  const closeSeeDetailsModal = () => {
    setSeeDetailsOpen(false);
    setSelectedEvent(null);
  };

  const openEditSessionModal = () => {
    setSeeDetailsOpen(false);
    setEditSessionOpen(true);
  };

  const closeEditSessionModal = () => {
    setEditSessionOpen(false);
  };

  const handleNextWeek = async () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    const year = nextWeek.getFullYear();
    const month = (nextWeek.getMonth() + 1).toString().padStart(2, "0");
    const day = nextWeek.getDate().toString().padStart(2, "0");
    const nextWeekDate = `${year}-${month}-${day}`;
    // hacer peticion por paginacion y añadir a activeSessions
    const { data } = await axios.get(
      `/api/sessions/pagination?orgId=${orgId}&date=${nextWeekDate}`
    );
    console.log(data);
    data.map((session: Event) => {
      if (
        !activeSessions.some((activeSession) => activeSession.id === session.id)
      ) {
        activeSessions.push(session);
      }
    });

    setCurrentDate(nextWeek);
  };

  const handlePreviousWeek = async () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    const year = previousWeek.getFullYear();
    const month = (previousWeek.getMonth() + 1).toString().padStart(2, "0");
    const day = previousWeek.getDate().toString().padStart(2, "0");
    const previousWeekDate = `${year}-${month}-${day}`;
    // hacer peticion por paginacion
    const { data } = await axios.get(
      `/api/sessions/pagination?orgId=${orgId}&date=${previousWeekDate}`
    );
    console.log(data);
    //añadir a activeSessions
    data.map((session: Event) => {
      if (
        !activeSessions.some((activeSession) => activeSession.id === session.id)
      ) {
        activeSessions.push(session);
      }
    });
    console.log(activeSessions);
    setCurrentDate(previousWeek);
  };

  const handleTodayWeek = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // evitar error domingos

    setCurrentDate(today);
  };

  const handleRemoveSession = async () => {
    const sessionId = selectedEvent?.id;
    // delete by id
    if (sessionId) await axios.delete(`/api/sessions/delete/${sessionId}`);
    setSelectedEvent(null);
    closeSeeDetailsModal();
    setActiveSessions(
      activeSessions.filter((session) => session.id !== sessionId)
    );
  };

  // Calculate the first day of the current week (Monday)
  const firstDayOfCurrentWeek = new Date(currentDate);
  firstDayOfCurrentWeek.setDate(
    currentDate.getDate() - currentDate.getDay() + 1
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDayOfCurrentWeek);
    date.setDate(firstDayOfCurrentWeek.getDate() + index);
    return date;
  });

  // Generate an array of hours from 9:00 AM to 9:00 PM
  const hours = Array.from({ length: 16 }, (_, index) => index + 7);
  const minutes = ["00", "15", "30", "45"];

  // Helper function to get events for a specific day and hour
  const getEventsForDayAndHour = (
    dayIndex: number,
    hour: number,
    minute: string
  ) => {
    const day = daysOfWeek[dayIndex];
    const dayDateString = day.toDateString();
    const selectedHour = `${hour}:${minute}`;

    return activeSessions.filter((event) => {
      const eventStartHour = event.startHour;
      //console.log(eventStartHour);
      // const eventEndHour = convertTimeStringToDate(
      //   calculateEndHour(eventStartHour, event.duration)
      // );
      return event.dates.some((sessionDate) => {
        const dayparts = sessionDate.date.split("-");
        const date = new Date(
          parseInt(dayparts[2]),
          parseInt(dayparts[1]) - 1,
          parseInt(dayparts[0])
        );

        const [hours, minutes] = eventStartHour.split(":");
        let formattedHours = `${hours}:${minutes}`;

        formattedHours = formattedHours.startsWith("0")
          ? formattedHours.slice(1)
          : formattedHours;

        return (
          date.toDateString() === dayDateString &&
          selectedHour === formattedHours
        );
      });
    });
  };

  const handleCellClick = (dayIndex: number, hour: number) => {
    const day = daysOfWeek[dayIndex];
    console.log(`Selected day: ${day}, Selected hour: ${hour}:00`);
  };

  const calculateSessionSize = (duration: number): number => {
    const size = (duration / 15) * 10;
    const rounded = Math.round(size);
    const extra = Math.round(duration / 60);
    return rounded + extra;
  };

  const currentMonth1 = daysOfWeek[0].toLocaleString("default", {
    month: "long",
  });
  const currentMonth2 = daysOfWeek[6].toLocaleString("default", {
    month: "long",
  });

  const currentYear = daysOfWeek[0].getFullYear();

  return (
    <div className="p-4 pt-0 pl-0">
      <div className="flex flex-row justify-end  items-center space-x-4 mb-2">
        <p className="text-xl font-semibold">
          {currentMonth1 == currentMonth2
            ? `${currentMonth1} ${currentYear}`
            : `${currentMonth1} - ${currentMonth2} ${currentYear}`}
        </p>
        <button
          onClick={handleTodayWeek}
          className="px-4 py-2 bg-[#D9D9D9] hover:bg-blue-500 hover:text-white rounded font-semibold border-custom-gray-300 border"
        >
          HOY
        </button>
        <button
          className="rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
          onClick={handlePreviousWeek}
        >
          <ChevronLeftIcon />
        </button>

        <button
          className=" rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
          onClick={handleNextWeek}
        >
          <ChevronRightIcon className="" />
        </button>
        <button
          onClick={() => setAddSessionOpen(true)}
          className="rounded text-white bg-custom-orange-100 px-4 py-2 font-semibold text-sm mx-5"
        >
          AÑADIR SESIÓN
        </button>
      </div>
      <table
        className="table-auto w-full"
        style={{ tableLayout: "auto", overflowX: "auto" }}
      >
        <thead>
          <tr className="w-full">
            <th className="p-2"></th>
            {daysOfWeek.map((day) => (
              <th
                key={day.toDateString()}
                className="border-t-0 border-gray-900 border-2"
              >
                <div>{day.toLocaleString("default", { weekday: "short" })}</div>
                <div>{day.getDate()}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="w-12 text-center font-semibold">{hour}:00</td>
              {daysOfWeek.map((_, dayIndex) => (
                <td
                  key={dayIndex}
                  className="h-[40px] w-[96px] border p-0 border-gray-400 border-l-2 border-l-gray-900 border-r-2 border-r-gray-900 cursor-pointer"
                  onClick={() => handleCellClick(dayIndex, hour)}
                >
                  {minutes.map((minute) => {
                    const eventsAtThisMinute = getEventsForDayAndHour(
                      dayIndex,
                      hour,
                      minute
                    );
                    const numberOfEvents = eventsAtThisMinute.length;
                    // TODO: CAMBIAR ESTO
                    if (numberOfEvents > 3) {
                      return (
                        <div key={minute} className="bg-blue-600 h-full"></div>
                      );
                    }
                    return (
                      <div
                        className={`h-[10px] grid gap-1`}
                        key={minute}
                        style={{
                          gridTemplateColumns: `repeat(${numberOfEvents}, minmax(0, 1fr))`,
                        }}
                      >
                        {eventsAtThisMinute.map((session) => {
                          const endHour = calculateEndHour(
                            session.startHour,
                            session.duration
                          );
                          const size = calculateSessionSize(session.duration);
                          const color = getColorHexadecimal(session.color);
                          // ESTO ES LA CARTA
                          console.log(session.name, size);
                          return (
                            <div
                              key={session.id}
                              className={`border rounded flex flex-col justify-start w-full p-2 cursor-pointer ${
                                size > 150
                                  ? "space-y-5 py-5 px-4"
                                  : size > 110
                                  ? "space-y-2"
                                  : "space-y-0"
                              }`}
                              style={{ height: size, backgroundColor: color }}
                              onClick={() => openSeeDetailsModal(session)}
                            >
                              <p className="text-white font-semibold line-clamp-2 max-w-full">
                                {session.name}
                              </p>
                              <div className="flex flex-row justify-end space-x-2 mx-1">
                                {session.group.teachers.map((teacher) => {
                                  if (
                                    teacher.user.profilePicture &&
                                    size > 100 &&
                                    numberOfEvents < 2
                                  )
                                    return (
                                      <div
                                        key={teacher.id}
                                        className={`rounded-full object-contain ${
                                          size > 150
                                            ? "h-12 w-12"
                                            : size < 110
                                            ? "h-6 w-6"
                                            : "h-8 w-8"
                                        }`}
                                      >
                                        <Image
                                          key={teacher.id}
                                          src={teacher.user.profilePicture?.url}
                                          alt="teacherPicture"
                                          height={100}
                                          width={100}
                                          className="rounded-full object-cover h-full w-full"
                                        />
                                      </div>
                                    );
                                })}
                              </div>
                              {size > 50 && (
                                <p className="text-sm text-white font-semibold line-clamp-2">
                                  ({hour}:{minute} - {endHour})
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {seeDetailsOpen && selectedEvent && (
        <CustomModal
          onClose={closeSeeDetailsModal}
          title={`Ver sesión - ${selectedEvent?.name}`}
        >
          <SeeSessionModal
            handleRemoveSession={handleRemoveSession}
            selectedEvent={selectedEvent}
            openEditSessionModal={openEditSessionModal}
          />
        </CustomModal>
      )}
      {editSessionOpen && selectedEvent && (
        <CustomModal
          onClose={closeEditSessionModal}
          title={`Editar sesión - ${selectedEvent.name}`}
        >
          <EditSessionModal
            selectedEvent={selectedEvent}
            onClose={closeEditSessionModal}
            setActiveSessions={handleActiveSessions}
            activeSessions={activeSessions}
          />
        </CustomModal>
      )}
      {addSessionOpen && !editSessionOpen && !seeDetailsOpen && (
        <CustomModal onClose={closeAddSessionModal} title="Añadir sesión">
          <CreateSessionModal
            onClose={closeAddSessionModal}
            setActiveSessions={handleActiveSessions}
            activeSessions={activeSessions}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default WeeklyView;
