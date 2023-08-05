import axios from "axios";
import {
  Boxes,
  CalendarDays,
  EuroIcon,
  LayoutDashboard,
  Mail,
  Settings,
  UserCheck,
  UserCircle2,
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { FC } from "react";

interface SideBarTeacherLayoutProps {
  pathname: string;
  router: AppRouterInstance;
}

const SideBarTeacherLayout: FC<SideBarTeacherLayoutProps> = ({
  pathname,
  router,
}) => {
  const handleLogout = async () => {
    // eliminar la cookie
    const { data } = await axios.get("/api/auth/logout");
    // llevarte a "/"
    router.push("/");
  };

  const calendarPathnames = [
    "/calendario",
    "/calendario/mes",
    "/calendario/hoy",
  ];

  return (
    <nav className="md:w-64 h-[calc(100vh-3.5rem)] bg-custom-gray-100 py-8 pl-5 pr-5 shadow-md border-r border-black border-b-0 hidden md:block">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-4">
          <div className="items-center space-y-4 w-full">
            <Link
              className="flex flex-row items-center space-x-4 w-full cursor-pointer active:scale-[95%] transition duration-100
               hover:bg-gray-300 rounded py-1 pl-4"
              href={"/dashboard"}
              prefetch={true}
            >
              <LayoutDashboard
                className={`h-10 w-10  font-bold ${
                  pathname === "/dashboard"
                    ? "text-custom-blue-100"
                    : "text-custom-gray-400"
                }`}
              />
              <p
                className={`font-bold text-lg ${
                  pathname === "/dashboard" ? "text-custom-blue-100" : ""
                }`}
              >
                Dashboard
              </p>
            </Link>
            <Link
              className="flex flex-row items-center space-x-4 w-full cursor-pointer active:scale-[95%] transition duration-100
              hover:bg-gray-300 rounded py-1 pl-4"
              href={"/calendario"}
            >
              <CalendarDays
                className={`h-10 w-10  font-bold ${
                  calendarPathnames.includes(pathname)
                    ? "text-custom-blue-100"
                    : "text-custom-gray-400"
                }`}
              />
              <p
                className={`font-bold text-lg ${
                  calendarPathnames.includes(pathname)
                    ? "text-custom-blue-100"
                    : ""
                }`}
              >
                Calendario
              </p>
            </Link>
            <Link
              className="flex flex-row items-center space-x-4 w-full cursor-pointer active:scale-[95%] transition duration-100
              hover:bg-gray-300 rounded py-1 pl-4"
              href={"/mails"}
            >
              <Mail
                className={`h-10 w-10  font-bold ${
                  pathname === "/mails"
                    ? "text-custom-blue-100"
                    : "text-custom-gray-400"
                }`}
              />
              <p
                className={`font-bold text-lg ${
                  pathname === "/mails" ? "text-custom-blue-100" : ""
                }`}
              >
                Mails
              </p>
            </Link>
          </div>

          <div className="items-center space-y-5 w-full">
            <Link
              className="flex flex-row items-center space-x-4 w-full cursor-pointer active:scale-[95%] transition duration-100
              hover:bg-gray-300 rounded py-1 pl-4"
              href={"/grupos"}
            >
              <Boxes
                className={`h-10 w-10  font-bold ${
                  pathname === "/grupos"
                    ? "text-custom-blue-100"
                    : "text-custom-gray-400"
                }`}
              />
              <p
                className={`font-bold text-lg ${
                  pathname === "/grupos" ? "text-custom-blue-100" : ""
                }`}
              >
                Grupos
              </p>
            </Link>
          </div>
          <div className="border-custom-gray-400 border-t-2 opacity-50" />
          <div className="items-center space-y-5 w-full">
            <Link
              className="flex flex-row items-center space-x-4 w-full cursor-pointer active:scale-[95%] transition duration-100
              hover:bg-gray-300 rounded py-1 pl-4"
              href={"/ajustes"}
            >
              <Settings
                className={`h-10 w-10  font-bold ${
                  pathname === "/ajustes"
                    ? "text-custom-blue-100"
                    : "text-custom-gray-400"
                }`}
              />
              <p
                className={`font-bold text-lg ${
                  pathname === "/ajustes" ? "text-custom-blue-100" : ""
                }`}
              >
                Ajustes
              </p>
            </Link>
          </div>
        </div>
        <button
          className="w-full text-center text-lg font-semibold rounded py-2 border-2 border-custom-gray-400"
          onClick={handleLogout}
        >
          Cerrar sesion
        </button>
      </div>
    </nav>
  );
};

export default SideBarTeacherLayout;
