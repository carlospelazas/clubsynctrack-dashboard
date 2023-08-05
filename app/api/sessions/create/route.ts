import { COOKIE_NAME } from "@/constants";
import { createSessionReq } from "@/lib/sessions/createSessionReq";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const cookieStore = cookies();
    const token = await cookieStore.get(COOKIE_NAME);
    const body = await req.json();

    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
    try{
        const response = await createSessionReq(token.value, body);
        return new Response(JSON.stringify(response),{
            status: 200
        })
    } catch(err){
        return new Response(JSON.stringify({message: 'Ha habido un error'}),{
            status: 500
        })
    }
}