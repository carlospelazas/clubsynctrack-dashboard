export interface AuthCredentials {
    email:string;
    password:string;
}

export async function logInReq(
    credentials: AuthCredentials
  ): Promise<{ token: string }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    if (res.status === 201) {
      const { accessToken } = await res.json();

      return { token: accessToken };
    }
    throw new Error(await res.text());
  }