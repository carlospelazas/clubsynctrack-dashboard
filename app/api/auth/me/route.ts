import { COOKIE_NAME } from "@/constants";
import { getMeReq } from "@/lib/auth/getMe";
import { cookies } from "next/headers"

export async function GET() {
    const cookieStore = cookies();
    const token = await cookieStore.get(COOKIE_NAME);

    if(!token){
        console.log('No token found');
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }

    try{
        const {user} = await getMeReq(token.value);
        const response = {
            user
        }
        return new Response(JSON.stringify(response),{
            status: 200
        })
    } catch(err){
        return new Response(JSON.stringify({message: 'Unauthorized'}),{
            status: 401
        })
    }
}