import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = await cookieStore.delete(COOKIE_NAME);
  return new Response(JSON.stringify({token}), {status: 200})
}