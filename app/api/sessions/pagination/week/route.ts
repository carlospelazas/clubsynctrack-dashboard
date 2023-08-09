import { COOKIE_NAME } from "@/constants";
import { getSessionsByOrgWeekReq } from "@/lib/sessions/getSessionsByOrganizationWeek";
//import { getSessionsByOrgWeekReq } from "@/lib/sessions/getSessionsByOrgWeekReq";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: any){
    const cookieStore = cookies();

    const token = await cookieStore.get(COOKIE_NAME);
    const currentDate = req.nextUrl.searchParams.get('date');
    const orgId = req.nextUrl.searchParams.get('orgId');
    

    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
    try{
        if(orgId && currentDate){
            const response = await getSessionsByOrgWeekReq(token.value,parseInt(orgId), currentDate);
            return new Response(JSON.stringify(response),{
                status: 200
            })
    }
    } catch(err){
        console.log("error aqui")
        return new Response(JSON.stringify({message: 'Ha habido un error'}),{
            status: 500
        })
    }
}