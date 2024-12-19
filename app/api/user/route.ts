import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
    try {
        const user = await currentUser();
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: user?.emailAddresses[0].emailAddress
            }
        })

        return new Response(JSON.stringify(prismaUser), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Internal server error", { status: 500 })
    }
}