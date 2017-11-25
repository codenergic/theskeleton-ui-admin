#!/bin/sh
alias nuxt="/app/node_modules/nuxt/bin/nuxt"

SERVER_URL=${SERVER_URL:-https://theskeleton.codenergic.org} \
PUBLIC_PATH=${PUBLIC_PATH} \
nuxt build

PORT=${PORT:-9000} \
HOST=${HOST:-0.0.0.0} \
nuxt start

exec "$@"
