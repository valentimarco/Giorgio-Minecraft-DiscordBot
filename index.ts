import { Client, Events, GatewayIntentBits } from 'discord.js';
import { Commands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, async readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    await client.application?.commands.set(Commands)
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const slashCommand = Commands.find(c => c.name == interaction.commandName)
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }
    
    await interaction.deferReply();

    slashCommand.run(client, interaction);

});

client.login(Bun.env.DISCORD_TOKEN);