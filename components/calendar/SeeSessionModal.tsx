import { FC } from "react";
import TeacherCustomComponent from "../reusable/teachers/TeacherCustomComponent";
import { calculateEndHour } from "@/lib/util/timeUtils";
import RemoveSessionAlertDialog from "./RemoveSessionAlertDialog";
import { Event } from "@/util/types/event.types";

interface SeeSessionModalProps {
  selectedEvent: Event;
  handleRemoveSession: () => Promise<void>;
  openEditSessionModal: () => void;
}

const SeeSessionModal: FC<SeeSessionModalProps> = ({
  selectedEvent,
  handleRemoveSession,
  openEditSessionModal,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-sm font-bold">Detalles de la sesion:</p>
        <div className="md:grid md:grid-cols-2 md:gap-2 flex flex-col ">
          <div className="flex flex-col space-y-5 mt-4 mb-8 ml-3">
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Nombre:</p>
              <p>{selectedEvent.name}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Dias:</p>
              {selectedEvent.dates.map((date) => (
                <p key={date.date}>{date.date}</p>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Hora:</p>
              <p>
                de {selectedEvent.startHour.slice(0, -3)} a{" "}
                {calculateEndHour(
                  selectedEvent.startHour,
                  selectedEvent.duration
                )}
              </p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Color:</p>
              <p>{selectedEvent.color}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Grupo:</p>
              <p>{selectedEvent.group.name}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Edad de alumnos:</p>
              <p>{selectedEvent.group.ageGroup}</p>
            </div>
            {/* TODO: CAMBIAR NUMERO DE ALUMNOS */}
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">Numero de alumnos:</p>
              <p>12</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Profesores:</p>
            <div className="flex flex-col space-y-3 overflow-y-auto p-2">
              {selectedEvent.group.teachers.map((teacher) => (
                <TeacherCustomComponent teacher={teacher} key={teacher.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="flex flex-row items-center justify-end space-x-6">
          <RemoveSessionAlertDialog onAccept={handleRemoveSession} />
          <button
            className="bg-custom-blue-100 text-white px-4 py-2 rounded"
            onClick={openEditSessionModal}
          >
            Editar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeSessionModal;
