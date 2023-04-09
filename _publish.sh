#!/usr/bin/env bash

set -e

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
cd ${SCRIPT_DIR}


node ./scripts/copy-patch-files.js

# step - build
cd blockly-src
yarn install
yarn build
yarn package
cd ..

# step - dist
rm -rf dist 
cp -rf blockly-src/dist dist 
node ./scripts/dist-package.js 

# step - publish
cd dist
npm publish . --access=public


