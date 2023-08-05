import { IUser } from "@/util/types/user.types";
import axios, { AxiosError } from "axios";

interface UserResponse {
    user: IUser | null;
    error: AxiosError | null;
  }

export async function getUserFromApi(): Promise<UserResponse> {
    try {
      const { data } = await axios.get("/api/auth/me");
      return {
        user: data.user,
        error: null,
      };
      
    } catch (err) {
      const error = err as AxiosError;
      return {
        user: null,
        error,
      };
    }
  }