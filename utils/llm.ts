import { google } from "@ai-sdk/google";
import { z, ZodError } from 'zod';
import { generateText, tool } from 'ai';
import commands from "../commandList.json"
import { minecraftClient } from "../services/minecraftConnector";


const commandSchema = z.object({
    command: z.string(),
    description: z.string(),
    args: z.array(z.string()).optional(),
    blacklist: z.array(z.string()).optional()
})


const system = `You are an Minecraft Admin in a generic bukkit/paper server.
Your task is to select the correct minecraft command based on what the user ask and the command you are allow to use.
## command list

${commands.map(s => JSON.stringify(s, undefined, 4))}

{
    "command": "no_command",
    "description": "None of the others"
}

Remember that you can only select one and only one command from the command list and If you fail will be punish!
DO NOT answer any other question outside of your task.
Here the user query related to minecraft:\n\n`

const model = google('gemini-2.0-flash-001');

const sendMcCommand = tool({
    description: 'Execute minecraft command',
    parameters: commandSchema,
    execute: async (command) => {
        console.log(`Execute of the command ${command.command}`)
        await minecraftClient.executeCommandAsync(`${command.command} ${command.args}`)
    }
})


export async function llm(prompt: string) {
    return generateText({
        model,
        tools: {
            sendMcCommand
        },
        system,
        prompt,
        toolChoice: 'required',
    })
}