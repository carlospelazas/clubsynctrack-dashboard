import {
  Event,
  createDatesDto,
  createEventDto,
} from "@/util/types/event.types";
import { GroupsResponseNoTeachers } from "@/util/types/groups.types";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MultipleDatePicker from "./atoms/MultipleDatePicker";
import { availableTimes } from "@/lib/util/availableHours";
import { calculateDurationInMinutes } from "@/lib/util/convertHourIntoDuration";
import { toast } from "react-toastify";

interface CreateSessionModalProps {
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

const CreateSessionModal: FC<CreateSessionModalProps> = ({
  onClose,
  activeSessions,
  setActiveSessions,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [availableGroups, setAvailableGroups] =
    useState<GroupsResponseNoTeachers[]>();
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const handleDates = (datesInput: Date[] | undefined) => {
    setDates(datesInput);
  };
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

  const startHour = watch("startHour");
  const endHour = watch("endHour");
  useEffect(() => {
    if (startHour && endHour && startHour >= endHour) {
      setValue("endHour", ""); // Clear endHour value
    }
  }, [setValue, watch, endHour, startHour]);

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

    try {
      const { data } = await axios.post("/api/sessions/create", onSubmitData);
      const newEvent: Event = data;
      setActiveSessions([...activeSessions, newEvent]);
      toast.success("Sesión creada con éxito");
      () => onClose();
    } catch (err) {
      console.log(data);
    }
  };

  if (availableGroups) {
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
              defaultValue={""}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="Nombre de la sesión"
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
              defaultValue={"blue"}
              render={({ field }) => (
                <select
                  {...field}
                  className="border-black border-2 rounded w-full h-10 px-2"
                >
                  <option value="blue">Azul</option>
                  <option value="red">Rojo</option>
                  <option value="green">Verde</option>
                </select>
              )}
            />
          </div>
          <div className="flex flex-row items-center space-x-12">
            <label className="font-semibold w-64">Hora comienzo:</label>
            <Controller
              name="startHour"
              control={control}
              //rules={{ validate: validateTime }}
              defaultValue={availableTimes[0]}
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
              //rules={{ validate: validateTime }}
              defaultValue={availableTimes[4]}
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
            {errors.endHour && <p>End Hour must be greater than Start Hour.</p>}
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
              defaultValue={availableGroups && availableGroups[0].id.toString()}
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
            Añadir sesión
          </button>
        </div>
      </form>
    );
  } else {
    return <p>Cargando los grupos...</p>;
  }
};

export default CreateSessionModal;
