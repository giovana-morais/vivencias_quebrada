import csv
import json
import re

def dms_to_decimal(dms_str):
    """
    Converte lat/lon (46°25'5.01"O) em graus pra decimal (-46.418058).
    Lida com 'O' (Oeste) e 'S' (Sul) como valores negativos.
    """
    # Regex pra identificar graus, minutos e segundos + a direção  
    parts = re.match(r"(\d+)°(\d+)'([\d.]+)\"([A-Z])", dms_str)
    if not parts:
        return None
    
    degrees = float(parts.group(1))
    minutes = float(parts.group(2))
    seconds = float(parts.group(3))
    direction = parts.group(4)
    
    decimal = degrees + (minutes / 60) + (seconds / 3600)
    
    # In Brazil/South America, O (West) and S (South) are negative
    if direction in ['O', 'W', 'S']:
        decimal *= -1
        
    return round(decimal, 6)

def convert_csv_to_json(input_file, output_file):
    data_list = []
    
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            print(row)
            lat_str = row['Latitude (Y)'].strip()
            long_str = row['Longitude (X)'].strip()

            if lat_str is None or lat_str == "":
                print(f"lat/lon vazio. Pulando entrada {row}")
                continue

            
            entry = {
                "img": f"dados/{row['Imagem'].strip()}",
                "audio": f"dados/{row['Áudio'].strip()}.wav", # Adding .wav extension
                "latitude": dms_to_decimal(lat_str),
                "longitude": dms_to_decimal(long_str),
                # "texto": row['Descrição'].strip(),
                "texto": row['LOCAL'].strip(),
                "categoria": row['Categoria']
            }
            data_list.append(entry)
            
    with open(output_file, mode='w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    arquivo_entrada = "input.csv"
    arquivo_saida = "../dados.json"
    convert_csv_to_json(arquivo_entrada, arquivo_saida)
    print(f"Dados convertidos. Resultados em {arquivo_saida}")

