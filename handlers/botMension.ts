import type { Client, Message } from "discord.js";
import { llm } from "../utils/llm";
import { isUserLinked } from "../services/database";

export async function handleBotMention(message: Message, client: Client) {
    const botId = client.user?.id
    const user = message.author.id

    //check if the message mentions the bot
    if (!message.mentions.members?.find((m) => m.id === botId)) {
        return;
    }

    if (!await isUserLinked(user)) {
        await message.reply(`SOLO I NEGRI ETICHETTATI POSSONO USARE LA DOCCIA`);
        return
    }


    let content = message.content.trim();

    content = content.replace(`<@${botId}>`, "")

    console.log(`Message content before trasformation: ${content}`)


    message.mentions.members?.forEach(
        (m) => {
            content = content.replace(
                `<@${m.id}>`,
                m.id === client.user?.id ? "" : `<@${m.id}>`
            )
        }
    );



    console.log(`Message content: ${content}`)
    await llm(content)


    await message.reply(`NEGRO ECCO LA SBOBBA`);
}