
export async function deleteSessionReq(id: number, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}