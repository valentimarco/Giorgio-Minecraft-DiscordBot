import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import { Commands, handleSlashCommand } from './commands';
import { handleUserLink } from './handlers/userLink';
import { handleBotMention } from './handlers/botMension';

const { DISCORD_TOKEN: discordToken } = Bun.env

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        //Needs Privileged Gateway Intents under bot settings
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});


client.on(Events.ClientReady, async readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    await client.application?.commands.set(Commands)
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.isCommand()) {
        await handleSlashCommand(client, interaction);
    }

});

client.on(Events.MessageCreate, async msg => {
    const isBot = msg.author.bot

    if (msg.author.id === client.user?.id || msg.system || isBot) return;

    handleUserLink(msg)
    handleBotMention(msg, client)
})


client.login(discordToken)
// .then(async () => { 
//     await db.$disconnect()
//     minecraftClient.disconnect()
// });