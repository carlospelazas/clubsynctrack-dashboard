import { COOKIE_NAME } from "@/constants";
import { getGroupsByOrgReq } from "@/lib/groups/getGroupsByOrg";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,{params}: any){
    const cookieStore = cookies();
    const token = await cookieStore.get(COOKIE_NAME);
    console.log(params.organizationId)

    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
    try{
        const response = await getGroupsByOrgReq(params.organizationId,token.value);
        return new Response(JSON.stringify(response),{
            status: 200
        })
    } catch(err){
        return new Response(JSON.stringify({message: 'Ha habido un error'}),{
            status: 500
        })
    }
}