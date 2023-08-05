import { COOKIE_NAME } from "@/constants";
import { logInReq } from "@/lib/auth/login";
import { serialize } from "cookie";

export async function POST(request: Request) {
    const body = await request.json();

    const { email, password } = body;

    const { token } = await logInReq({email, password});

    if(!token) {
        return new Response(JSON.stringify({message: 'Invalid credentials'}),{
            status: 401
        })
    }

    const serialized = serialize(COOKIE_NAME, token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });

    const response = {
        message: 'Authenticated'
    }

    return new Response(JSON.stringify(response),{
        status: 200,
        headers: {"Set-cookie": serialized}
    })
}
