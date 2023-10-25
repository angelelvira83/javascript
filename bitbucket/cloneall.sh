#!/bin/bash

# Clona todos los proyectos del repo

projects=$(curl -s --insecure -v --user X47450EL:AnRa28gq --request GET https://bitbucket.almeci.io/rest/api/1.0/projects/FIREFLY-TESTING/repos?limit=1000 | jq '.values[] | .links.clone[] | select(.name == "http") | .href')

echo $projects

for r in $projects
do
  rr=$(echo $r | tr -d '"')
  echo $rr
  git clone $rr
done
