import { GroupsResponseNoTeachers } from "@/util/types/groups.types";

export async function getGroupsByOrgReq(id: number, token: string): Promise<GroupsResponseNoTeachers[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/organization/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return await response.json();
}