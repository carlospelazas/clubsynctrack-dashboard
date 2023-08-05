"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface ToggleViewProps {}

const ToggleView: FC<ToggleViewProps> = ({}) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="bg-custom-gray-300 flex flex-row rounded-lg px-4 py-2 w-fit text-sm space-x-5 font-semibold items-center lg:-mb-5">
      <Link
        className={`w-24 text-center ${
          pathname === "/calendario"
            ? "bg-white py-1 rounded"
            : "hover:bg-gray-300 py-1 rounded"
        }`}
        href={"/calendario"}
      >
        Semana
      </Link>
      <Link
        className={`w-24 text-center ${
          pathname === "/calendario/mes"
            ? "bg-white py-1 rounded"
            : "hover:bg-gray-300 py-1 rounded"
        }`}
        href={"/calendario/mes"}
      >
        Mes
      </Link>
      <Link
        className={`w-24 text-center ${
          pathname === "/calendario/hoy"
            ? "bg-white py-1 rounded"
            : "hover:bg-gray-300 py-1 rounded"
        }`}
        href={"/calendario/hoy"}
      >
        Hoy
      </Link>
    </div>
  );
};

export default ToggleView;
