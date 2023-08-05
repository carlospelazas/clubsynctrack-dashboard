"use client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  UserCircle2,
  Boxes,
  UserCheck,
  Settings,
  Search,
  EuroIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IUser } from "@/util/types/user.types";

interface SearchBarProps {
  user: IUser;
}

const SearchBar: FC<SearchBarProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
    setOpen(false);
  };
  return (
    <div>
      <button
        className="hover:bg-custom-gray-100 p-1 rounded cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Search className="h-7 w-7 text-custom-gray-400 stroke-2" />
      </button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Escribe para buscar... " />
        <CommandList>
          <CommandEmpty>No se han encontrado resultados</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CustomCommandItem onClick={() => handleClick("/dashboard")}>
              <LayoutDashboard />
              <span>Dashboard</span>
            </CustomCommandItem>
            <CustomCommandItem onClick={() => handleClick("/calendario")}>
              <CalendarDays />
              <span>Calendario</span>
            </CustomCommandItem>
            <CustomCommandItem onClick={() => handleClick("/mails")}>
              <Mail />
              <span>Mails</span>
            </CustomCommandItem>
            {user.role !== "teacher" && (
              <CustomCommandItem onClick={() => handleClick("/profesores")}>
                <UserCircle2 />
                <span>Profesores</span>
              </CustomCommandItem>
            )}
            <CustomCommandItem onClick={() => handleClick("/grupos")}>
              <Boxes />
              <span>Grupos</span>
            </CustomCommandItem>
            {user.role !== "teacher" && (
              <CustomCommandItem onClick={() => handleClick("/clientes")}>
                <UserCheck />
                <span>Clientes</span>
              </CustomCommandItem>
            )}
            {user.role !== "teacher" && (
              <CustomCommandItem onClick={() => handleClick("/facturacion")}>
                <EuroIcon />
                <span>Facturación</span>
              </CustomCommandItem>
            )}
            <CustomCommandItem onClick={() => handleClick("/ajustes")}>
              <Settings />
              <span>Ajustes</span>
            </CustomCommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

interface CustomCommandItemProps {
  onClick?: () => void;
  children: any;
}

const CustomCommandItem: FC<CustomCommandItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <CommandItem className="cursor-pointer active:scale-[98%] transition duration-150 flex flex-row space-x-2 items-center">
        {children}
      </CommandItem>
    </div>
  );
};
export default SearchBar;
