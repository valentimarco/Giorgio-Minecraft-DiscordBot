import { Client, CommandInteraction } from "discord.js";
import type { Command } from "../types";
import { Pong } from "./test/pong";
import { LinkAccount } from "./link";

export const Commands: Command[] = [Pong, LinkAccount]

export const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};