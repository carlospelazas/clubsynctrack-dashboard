import { FC } from "react";
import { Search, Settings } from "lucide-react";
import { IUser } from "@/util/types/user.types";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import SearchBar from "./atoms/SearchBar";

interface TopBarLayoutProps {
  user: IUser | null;
  router: AppRouterInstance;
}

const TopBarLayout: FC<TopBarLayoutProps> = ({ user, router }) => {
  if (user) {
    return (
      <nav className="h-14 w-full border-b border-black shadow-md flex flex-row justify-end items-center">
        <div className="mr-16 flex flex-row items-center h-full py-2">
          <div className="flex flex-row items-center h-full space-x-4">
            <SearchBar user={user} />
            <button
              className="hover:bg-custom-gray-100 p-1 rounded cursor-pointer"
              onClick={() => router.push("/ajustes")}
            >
              <Settings className="h-7 w-7 text-custom-gray-400 stroke-2" />
            </button>
            <div className="bg-custom-gray-100 px-3 py-1 rounded">
              <p className="text-sm font-semibold cursor-default">
                {user.role.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="border-l-2 border-custom-gray-400 h-full my-3 md:mx-8 mx-3" />
          {user.profilePicture && (
            <Image
              src={user.profilePicture?.url}
              alt="hola"
              height={50}
              width={50}
              className="rounded-full object-cover h-10 w-10"
            />
          )}
          {!user.profilePicture && (
            <div className="rounded-full object-cover h-10 w-10 border-black border bg-custom-gray-100"></div>
          )}
        </div>
      </nav>
    );
  }
  return <p>Error</p>;
};

export default TopBarLayout;
