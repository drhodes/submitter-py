#/usr/bin/env bash


# ------------------------------------------------------------------
# python

# the .ipython directory doesn't seem to exist before the user is
# active, so it needs to be created ahead of time.

mkdir -p /home/jovyan/.ipython

SUBMITTER_PY=/home/jovyan/.ipython/submitter.py
SUBMITTER_PY_URL="https://raw.githubusercontent.com/drhodes/submitter-py/main/submitter.py"

# put the python submitter script on the path
wget $SUBMITTER_PY_URL -O $SUBMITTER_PY

python3 -m pip install pyyaml


# ------------------------------------------------------------------
# javascript that enables the submit button


SUBMITTER_JS_URL="https://raw.githubusercontent.com/drhodes/submitter-py/main/js/custom.js"
SUBMITTER_JS_DIR=/home/jovyan/.jupyter/custom/
SUBMITTER_JS=$SUBMITTER_JS_DIR/custom.js

mkdir -p $SUBMITTER_JS_DIR

# put the python submitter script on the path
wget $SUBMITTER_JS_URL -O $SUBMITTER_JS


# ------------------------------------------------------------------
# drop labconfig in the home directory?

cd $HOME

