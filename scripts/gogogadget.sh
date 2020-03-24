#!/bin/bash

# this script is meant to get us up and running, set venv, and export the app to flask app.  Flask run is left to the user.

export CDPATH=$HOME

export PYTHONPATH=~/Documents/code/Creative/Aaru

source ~/.venv/aaru/bin/activate

cd Documents/code/Creative/Aaru

# run the api server

echo "to run the frontend server: ./src/npm start"
echo "to run the backend server: python3 ./server/run.py"
