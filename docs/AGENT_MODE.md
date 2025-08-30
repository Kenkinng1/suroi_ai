# Agent Mode

**Safety:** Agent Mode is intended for local, self-hosted experimentation only. Never connect the headless agent to public `suroi.io` servers. All networking is restricted to `127.0.0.1` and guarded by a shared token.

This document describes the minimal Agent Mode infrastructure added for reinforcement learning experiments.

## Setup

1. Copy `config/agent.config.example.json` to `config/agent.config.json` and adjust the values as needed.
2. Start the game server in Agent Mode:
   ```bash
   pnpm agent:server
   ```
3. Run the TypeScript and Python unit tests:
   ```bash
   pnpm agent:test
   ```

## Observation and Action Schemas

Observations are encoded as a flat Float32 array of length **125**. Values are normalised to `[0,1]` and include self state, zone info, the nearest eight enemies and ten loot items, map context, and timers. Missing entities are padded with zeros.

Actions are represented as a Float32 array of length **9**: `[moveX, moveY, aim, fire, reload, interact, weapon, heal, sprint]`.

## Rewards

Reward weights are configured in `agent.config.json`. The example configuration provides small survival incentives and penalties for being outside the safe zone.

## Troubleshooting

- Ensure the server is bound to `127.0.0.1` and the token matches between the client and server.
- Port conflicts will prevent the agent from connecting. Adjust the `port` field in the config if necessary.
- Slow training can often be mitigated by lowering `tick_hz` in the configuration.

## Roadmap

Future improvements could include multi-agent matches, richer observation features and curriculum-based training schedules.
