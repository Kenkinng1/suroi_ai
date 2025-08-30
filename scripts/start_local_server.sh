#!/bin/sh
# Start the Suroi server in Agent Mode using the example configuration.
DIR=$(dirname "$0")/..
CONFIG=$DIR/config/agent.config.example.json
AGENT_MODE=1 node $DIR/server/dist/server/src/server.js --config $CONFIG
