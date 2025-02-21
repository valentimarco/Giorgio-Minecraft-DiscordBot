import { PrismaClient } from "@prisma/client";


export const db = new PrismaClient()



export async function isUserLinked(discordId: string): Promise<boolean> {
   return await db.user.findFirst({ where: { discordId: discordId } }) ? true : false
}