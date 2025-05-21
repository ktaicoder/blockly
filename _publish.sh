#!/usr/bin/env bash

set -e

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
cd ${SCRIPT_DIR}

./_dist.sh

cd dist
npm publish . --access=public --tag=next
