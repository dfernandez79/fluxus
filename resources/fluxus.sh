#!/usr/bin/env bash
open -b com.invisionapp.InVisionSync
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd "$DIR/../Resources"
./node ./app/bin/fluxus "$HOME/fluxus-config.json"
