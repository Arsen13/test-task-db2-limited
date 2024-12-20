import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
    try {
        const user = await currentUser();

        console.log("Receive user", user)

        const prismaUser = await prisma.user.findUnique({
            where: {
                email: user?.emailAddresses[0].emailAddress
            }
        })

        if (!prismaUser) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 })

        return new Response(JSON.stringify(prismaUser), { status: 200 })
    } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        return new Response(JSON.stringify({ message: "Internal server error"}), { status: 500 })
    }
}