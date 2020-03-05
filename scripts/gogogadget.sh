#!/bin/bash

# this script is meant to get us up and running, set venv, and export the app to flask app.  Flask run is left to the user.

export CDPATH=$HOME

source .venv/aaru/bin/activate

cd Documents/code/Creative/react-writing/aaru

# run the api server

npm start
