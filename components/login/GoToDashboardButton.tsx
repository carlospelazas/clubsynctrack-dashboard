"use client";

import { useRouter } from "next/navigation";
import React from "react";

function GoToDashboardButton() {
  const router = useRouter();
  return (
    <button
      className="bg-blue-500 px-3 rounded py-1 text-white"
      onClick={() => router.push("/dashboard")}
    >
      Ir al dashboard
    </button>
  );
}

export default GoToDashboardButton;
