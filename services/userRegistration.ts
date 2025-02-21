type PendingUser = {
    otp: string;
    minecraftUsername: string;
}

// You might want to use a proper cache service instead of a Map
export const listeningNewUsers = new Map<string, PendingUser>();