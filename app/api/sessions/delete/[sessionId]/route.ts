import { COOKIE_NAME } from "@/constants";
import { deleteSessionReq } from "@/lib/sessions/deleteSessionReq";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, {params}: any){
    const cookieStore = cookies();
    const token = await cookieStore.get(COOKIE_NAME);
    console.log(params.sessionId)

    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
    console.log('Token found');
    try{
        await deleteSessionReq(params.sessionId,token.value);
        return new Response(JSON.stringify({message: 'Deleted succesfully'}),{
            status: 200
        })
    } catch(err){
        return new Response(JSON.stringify({message: 'Ha habido un error'}),{
            status: 500
        })
    }
}