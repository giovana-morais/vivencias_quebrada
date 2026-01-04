#!/bin/sh

# bate na API no open street map pra pegar as informações de contorno de
# Guaianases e salva em um arquivo
curl "https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=Guaianases" \
  -H "User-Agent: vivencias_quebrada" \
  | jq '.[0].geojson' > dados/guaianases.geojson
