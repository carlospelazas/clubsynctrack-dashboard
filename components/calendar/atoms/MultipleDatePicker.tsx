import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { SelectMultipleEventHandler } from "react-day-picker";

interface MultipleDatePickerProps {
  dates: Date[] | undefined;
  handleDates: (datesInput: Date[] | undefined) => void;
}

const MultipleDatePicker: FC<MultipleDatePickerProps> = ({
  dates,
  handleDates,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full flex flex-row items-center justify-between font-normal border-2 border-black rounded",
            !dates && "text-muted-foreground"
          )}
        >
          <p>
            {dates
              ? `${dates.length} dias seleccionados`
              : "Porfavor selecciona dias"}
          </p>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {/*dates ? format(dates, "PPP") : <span>Pick a date</span>*/}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={handleDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default MultipleDatePicker;
