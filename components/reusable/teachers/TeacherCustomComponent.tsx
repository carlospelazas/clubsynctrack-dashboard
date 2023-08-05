import { Teacher } from "@/util/types/event.types";
import Image from "next/image";
import { FC } from "react";

interface TeacherCustomComponentProps {
  teacher: Teacher;
}

const TeacherCustomComponent: FC<TeacherCustomComponentProps> = ({
  teacher,
}) => {
  return (
    <div className="bg-custom-gray-200 shadow-md h-16 md:h-20 flex flex-row items-center justify-between px-2">
      <div className="flex flex-row items-center space-x-3">
        <div className="h-12 w-12 rounded">
          {teacher.user.profilePicture && (
            <Image
              alt="profilePicture"
              src={teacher.user.profilePicture?.url}
              height={50}
              width={50}
              className="rounded-full object-cover h-12 w-12"
            />
          )}
          {!teacher.user.profilePicture && (
            <div className="rounded-full h-12 w-12 bg-custom-gray-300" />
          )}
        </div>
        <div className="flex flex-col">
          <p className=" font-semibold">
            {teacher.firstname} {teacher.lastname}
          </p>
          <p className="text-xs font-semibold">{teacher.birthdate}</p>
        </div>
      </div>
      <div className="flex flex-col items-end text-sm font-semibold">
        <p>{teacher.user.email}</p>
        <p>{teacher.telephone}</p>
      </div>
    </div>
  );
};

export default TeacherCustomComponent;
