#!/bin/bash

# this script is meant to get us up and running, set venv, and export the app to flask app.  Flask run is left to the user.

export CDPATH=$HOME

export PYTHONPATH=~/Documents/code/Creative/react-writing

source ~/.venv/aaru/bin/activate

cd Documents/code/Creative/react-writing/aaru

# run the api server

zsh -e <(echo "emacs ~/Documents/code/Creative/react-writing/aaru/src/App.jsx ~/Documents/code/Creative/react-writing/aaru/server/app.py -mm") &

echo "to run the server: npm start"
