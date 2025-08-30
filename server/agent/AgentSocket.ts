// Lightweight handshake helper for agent WebSocket connections.
// The real server wires this into uWebSockets.js, but for the purposes of unit tests
// we expose pure functions that verify security requirements.

export interface AgentConfig {
    allowlist: string[];
    agent_token: string;
}

/** Verify that the connecting IP and token are allowed. */
export function validateHandshake(remoteAddress: string, token: string, cfg: AgentConfig): boolean {
    if (!cfg.allowlist.includes(remoteAddress)) return false;
    return token === cfg.agent_token;
}

