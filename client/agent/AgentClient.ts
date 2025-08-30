// Headless WebSocket client for Agent Mode. In the real game the client would
// connect to the server and stream actions. For the purposes of local training
// the class below exposes a minimal interface used by Python scripts.

export interface AgentClientOptions {
    url: string;
    token: string;
}

export class AgentClient {
    private socket?: WebSocket;
    constructor(private opts: AgentClientOptions) {}

    /** No-op placeholder for establishing a WebSocket connection. */
    async connect(): Promise<void> {
        // In a full implementation this would perform the handshake with the
        // game server. We omit the implementation here to keep the example
        // lightweight and self contained.
        return Promise.resolve();
    }
}

