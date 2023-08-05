"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    try {
      const { data } = await axios.post("/api/auth/login", payload);
      router.push("/dashboard");
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          className="border rounded border-black"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="password"
          className="border rounded border-black"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-orange-600 text-white w-fit rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
