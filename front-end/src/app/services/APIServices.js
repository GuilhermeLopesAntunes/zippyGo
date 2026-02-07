export async function getFunction()
{
    const response = await fetch("/api/user", { cache: "no-store" })
    return response.json()
}