import { Message, DMChannel } from "discord.js";
import { listeningNewUsers } from "../services/userRegistration";
import { db, isUserLinked } from "../services/database";


export async function handleUserLink(message: Message) {
    const user = message.author.id

    //This will enter only after the link command!
    if (message.channel instanceof DMChannel && listeningNewUsers.has(user)) {
        console.log(`Received DM from ${message.author.tag}: ${message.content}`);

        if (!message.content.startsWith("!confirm")) return;

        if (await isUserLinked(user)) {
            await message.channel.send(`NEGRO SEI GIA REGISTRATO`)
            return
        }

        const confirmBody = message.content.split(" ")[1]

        if (listeningNewUsers.get(user)!.otp !== confirmBody) {
            await message.channel.send("NEGRO LA OTP E' DIVERSA, CHE CAZZO FAI")
            return
        }
        //does prisma use transactions???
        await db.user.create({
            data: {
                discordId: user,
                minecraftId: listeningNewUsers.get(user)!.minecraftUsername
            }
        })

        listeningNewUsers.delete(user)

        await message.channel.send("ECCO QUA IL TUO PISELLINO")
    }
}