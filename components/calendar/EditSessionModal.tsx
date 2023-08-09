import { calculateEndHour } from "@/lib/util/timeUtils";
import {
  Event,
  createDatesDto,
  createEventDto,
} from "@/util/types/event.types";
import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MultipleDatePicker from "./atoms/MultipleDatePicker";
import axios from "axios";
import { GroupsResponseNoTeachers } from "@/util/types/groups.types";
import { toast } from "react-toastify";
import { calculateDurationInMinutes } from "@/lib/util/convertHourIntoDuration";
import { availableTimes } from "@/lib/util/availableHours";

interface EditSessionModalProps {
  selectedEvent: Event;
  onClose: () => void;
  activeSessions: Event[];
  setActiveSessions: (sessions: Event[]) => void;
}

interface FormData {
  name: string;
  startHour: string;
  endHour: string;
  color: string;
  group: string;
  dates: createDatesDto[];
  duration: number;
}

const EditSessionModal: FC<EditSessionModalProps> = ({
  selectedEvent,
  onClose,
  setActiveSessions,
  activeSessions,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const selectedDates: Date[] = [];
  selectedEvent.dates.forEach((date) => {
    const dateParts = date.date.split("-");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);
    const dateObject = new Date(year, month, day);
    selectedDates.push(dateObject);
  });

  const [dates, setDates] = useState<Date[] | undefined>(selectedDates);
  const [availableGroups, setAvailableGroups] =
    useState<GroupsResponseNoTeachers[]>();

  useEffect(() => {
    (async () => {
      try {
        console.log("se ejecuta el useffect");
        const response = await axios.get("/api/groups/organization/1");
        const possibleGroups: GroupsResponseNoTeachers[] = response.data;
        setAvailableGroups(possibleGroups);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleDates = (datesInput: Date[] | undefined) => {
    setDates(datesInput);
  };

  const onSubmit = async (data: FormData) => {
    const datesOutput: createDatesDto[] = [];
    const duration = calculateDurationInMinutes(data.startHour, data.endHour);
    if (dates) {
      dates.forEach((date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const dateString = `${day}-${month}-${year}`;
        const createDate: createDatesDto = {
          date: dateString,
        };
        datesOutput.push(createDate);
      });
      data = {
        ...data,
        dates: datesOutput,
        duration: duration,
      };
    }

    const onSubmitData: createEventDto = {
      name: data.name,
      color: data.color,
      dates: data.dates,
      duration: duration,
      group: parseInt(data.group),
      startHour: data.startHour,
    };
    // LLAMAR AL API PARA EDITAR LA SESION CON EL ID DE SELECTEDDATES
    try {
      const response = await axios.put(
        `/api/sessions/edit/${selectedEvent.id}`,
        onSubmitData
      );
      setActiveSessions(
        activeSessions.map((session) =>
          session.id === selectedEvent.id ? { ...response.data } : session
        )
      );
      toast.success("Sesión editada con éxito");
      () => onClose();
    } catch (err) {
      console.log(data);
    }
  };

  // TODO: VALIDAR LOS TIEMPOS, QUE EL STARTTIME < ENDTIME
  const validateTime = (value: string) => {
    const [hourStr, minuteStr] = value.split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    if (hour < 7 || hour > 23) {
      return "Hours must be between 7 am and 10 pm";
    }

    if (![0, 15, 30, 45].includes(minute)) {
      return "Minutes must be 0, 15, 30, or 45";
    }

    return true;
  };
  const startHour = selectedEvent.startHour.slice(0, -3);
  const endHour = calculateEndHour(
    selectedEvent.startHour,
    selectedEvent.duration
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="mb-10">
        <p className="font-bold text-sm">Detalles de la sesión:</p>
      </div>
      <div className="grid grid-cols-2 gap-x-16 gap-y-24">
        <div className="flex flex-row items-center space-x-12">
          <label className="font-semibold">Nombre:</label>
          <Controller
            name="name"
            control={control}
            defaultValue={selectedEvent.name}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="border-black border-2 rounded w-full h-10 px-2"
              />
            )}
          />
        </div>
        <div className="flex flex-row items-center space-x-12">
          <label className="font-semibold">Color:</label>
          <Controller
            name="color"
            control={control}
            defaultValue={selectedEvent.color}
            render={({ field }) => (
              <select
                {...field}
                className="border-black border-2 rounded w-full h-10 px-2"
              >
                <option value="blue">Azul</option>
                <option value="red">Rojo</option>
                <option value="green">Verde</option>
                <option value="gray">Gris</option>
              </select>
            )}
          />
        </div>
        <div className="flex flex-row items-center space-x-12">
          <label className="font-semibold w-64">Hora comienzo:</label>
          <Controller
            name="startHour"
            control={control}
            rules={{ validate: validateTime }}
            defaultValue={startHour}
            render={({ field }) => (
              <select
                {...field}
                className="border-black border-2 rounded w-full h-10 px-2"
              >
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.startHour && <span>{errors.startHour.message}</span>}
        </div>
        <div className="flex flex-row items-center space-x-12">
          <label className="font-semibold w-40">Hora final:</label>
          <Controller
            name="endHour"
            control={control}
            rules={{ validate: validateTime }}
            defaultValue={endHour}
            render={({ field }) => (
              <select
                {...field}
                className="border-black border-2 rounded w-full h-10 px-2"
              >
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.endHour && <span>{errors.endHour.message}</span>}
        </div>
        <div className="flex flex-row items-center space-x-16">
          <label className="font-semibold">Dias:</label>
          <MultipleDatePicker dates={dates} handleDates={handleDates} />
        </div>
        <div className="flex flex-row items-center space-x-16">
          <label className="font-semibold">Grupo:</label>
          <Controller
            name="group"
            control={control}
            defaultValue={selectedEvent.group.id.toString()}
            render={({ field }) => (
              <select
                {...field}
                className="border-black border-2 rounded w-full h-10 px-2"
              >
                {availableGroups &&
                  availableGroups.map((group) => (
                    <option value={group.id.toString()} key={group.id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            )}
          />
        </div>
      </div>
      <div className="w-full  h-max flex flex-row items-end justify-end lg:mt-32 space-x-8">
        <button
          className="bg-red-600 px-4 py-2 rounded text-sm text-white font-semibold"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-custom-blue-100 px-4 py-2 rounded text-sm text-white font-semibold"
        >
          Aceptar cambios
        </button>
      </div>
    </form>
  );
};

export default EditSessionModal;
