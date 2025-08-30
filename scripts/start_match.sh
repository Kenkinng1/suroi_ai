#!/bin/sh
# Convenience wrapper around start_local_server that could pass seed/params.
# For this example it simply calls the server start script.
$(dirname "$0")/start_local_server.sh "$@"
