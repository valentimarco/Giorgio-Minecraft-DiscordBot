import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

declare module "bun" {
    interface Env {
        DISCORD_TOKEN: string,
        RCON_IP: string,
        RCON_PORT: string,
        RCON_PASSWORD: string
    }
}