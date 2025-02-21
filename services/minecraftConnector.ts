import { RCONClient } from "@minecraft-js/rcon";


const { RCON_IP: rconIp, RCON_PORT: rconPort, RCON_PASSWORD: rconPassword } = Bun.env

export const minecraftClient = new RCONClient(rconIp, rconPassword, Number(rconPort)).connect();