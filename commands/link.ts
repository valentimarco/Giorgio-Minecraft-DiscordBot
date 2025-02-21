import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, type ApplicationCommandAutocompleteStringOptionData, type ApplicationCommandOptionData } from "discord.js"
import type { Command } from "../types"
import { generateOTP } from "../utils"
import { db, isUserLinked } from "../services/database"
import { minecraftClient } from "../services/minecraftConnector"
import { listeningNewUsers } from "../services/userRegistration"

const parameters: ApplicationCommandAutocompleteStringOptionData[] = [
    {
        name: "minecraft-username",
        description: "The username of your minecraft account",
        required: true,
        autocomplete: true,
        type: ApplicationCommandOptionType.String
    }
]


export const LinkAccount: Command = {
    name: "linkaccount",
    description: "links your discord account into the minecraft server",
    type: ApplicationCommandType.ChatInput,
    options: parameters,
    run: async (client: Client, interaction: CommandInteraction) => {
        // 1. When invoked, send a OTP as DM in minecraft
        // 2. If is the same OTP, link the accounts Otherwise don't. OTP expire after 30s
        const { value: username } = interaction.options.get("minecraft-username", true)
        const user = interaction.user

        if (!username || typeof username !== 'string') {
            const content = `A Strunz, non hai passato una parola`
            await interaction.followUp({ content, flags: "Ephemeral" })
            return
        }

        if (await isUserLinked(user?.id)) {
            const content = `<@${user?.id}>Negro sei gia registrato!`
            await interaction.followUp({ content, flags: "Ephemeral" })
            return
        }

        // maybe hashing is not a bad idea...
        const OTP = generateOTP()

        await minecraftClient.executeCommandAsync(`whisper ${username} [Server] Send this OTP to the bot: ${OTP} `)

        const content = `Check the message in game and follow the instructions!`

        await interaction.followUp({ content, flags: "Ephemeral" })

        await user.send("NEGRO BASTARDO, DAMMI OTP")

        listeningNewUsers.set(user?.id, { minecraftUsername: username, otp: OTP })
    }
}