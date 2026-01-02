#!/bin/sh
# converte arquivos .m4a pra .wav usando 16000 de freq de sampling

cd ~/Documents/projects/vivencias_quebrada/dados/

for arquivo_m4a in ls *.m4a; do
    echo "convertendo $arquivo_m4a";
    ffmpeg -i $f -ar 16000 "${arquivo_m4a%.*}.wav";
    rm $arquivo_m4a;
done;
