#! /bin/bash

cd source/templates

for file in *.haml; do
  hamlet -r Runtime < $file > ${file/.haml}.js
done

for file in *.js; do
  echo "(window.JST || (window.JST = {}))['${file/.js}'] = " > tmpfile
  cat $file >> tmpfile
  mv tmpfile $file
done

cat *.js > ../javascripts/templates.js