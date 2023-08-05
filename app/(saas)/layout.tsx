"use client";

import SideBarAdminLayout from "@/components/navComponents/sidebar/SideBarLayoutAdmin";
import SideBarTeacherLayout from "@/components/navComponents/sidebar/SideBarTeacherLayout";
import TopBarLayout from "@/components/navComponents/topbar/TopBarLayout";
import ToastifyContainer from "@/components/toast/ToastifyContainer";
import { getUserFromApi } from "@/lib/auth/getUserFromApi";
import { IUser } from "@/util/types/user.types";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUserFromApi();
      if (error) {
        router.push("/");
        return;
      }
      setUser(user);
      setIsSuccess(true);
    })();
  }, [router]);
  if (!isSuccess) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <TopBarLayout user={user} router={router} />
      <div className="flex flex-row">
        {user?.role === "teacher" ? (
          <SideBarTeacherLayout pathname={pathname} router={router} />
        ) : (
          <SideBarAdminLayout pathname={pathname} router={router} />
        )}
        <div className="overflow-y-auto h-[calc(100vh-3.5rem)] md:w-[calc(100vw-16rem)]  w-screen">
          {children}
        </div>
      </div>
      <ToastifyContainer />
    </>
  );
}
