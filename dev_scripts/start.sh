#!/bin/bash

if [ -z "$2" ] 
then
	echo 'No argument supplied, defaulting to mp3/default.mp3'
fi

FILE=${2-'mp3/default.mp3'}
FILE=$(echo $FILE | sed -e 's/\//\\\//g')
FILE="$FILE"

sed -e "s/REPLACEME/$FILE/" app/main.js > app/index.js

budo app/index.js:release.js -v --live | garnish
