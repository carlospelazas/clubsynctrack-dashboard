import { COOKIE_NAME } from "@/constants";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getAccessToken(): Promise<RequestCookie | undefined>{
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    return token;
}