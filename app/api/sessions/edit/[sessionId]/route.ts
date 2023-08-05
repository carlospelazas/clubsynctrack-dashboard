import { COOKIE_NAME } from "@/constants";
import { editSessionReq } from "@/lib/sessions/editSessionReq";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, {params}: any){
    const cookieStore = cookies();

    const sessionId = params.sessionId;
    const token = await cookieStore.get(COOKIE_NAME);
    const body = await req.json();
    
    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
    try{
        const response = await editSessionReq(sessionId,token.value,body);
        return new Response(JSON.stringify(response),{
            status: 200
        })
    } catch(err){
        console.log("error aqui")
        return new Response(JSON.stringify({message: 'Ha habido un error'}),{
            status: 500
        })
    }

}