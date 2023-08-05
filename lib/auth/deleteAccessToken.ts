import { COOKIE_NAME } from "@/constants";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function deleteAccessToken(): Promise<ResponseCookies>{
    const cookieStore = cookies();
    const token = cookieStore.delete(COOKIE_NAME);
    return token;
}