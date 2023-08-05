import { IUser } from "@/util/types/user.types";

export async function getMeReq(
    token: string,
  ): Promise<{ user: IUser }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        revalidate: 10,
      }
    });
    if (res.status === 200) {
      const user = await res.json();
      return { user };
    }
    throw new Error(await res.text());
  }