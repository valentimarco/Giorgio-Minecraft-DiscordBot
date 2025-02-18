import { ApplicationCommandType, Client, CommandInteraction, SlashCommandBuilder } from "discord.js"
import { Command } from "../../types"

export const Pong: Command = {
    name: "pong",
    description: "Replies with Pong!",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            flags: "Ephemeral",
            content: "Pong!"
        })
    }
}