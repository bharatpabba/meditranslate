import csv
import json



results = []
with open("medi_translate.csv") as csvfile:
    reader = csv.reader(csvfile) # change contents to floats
    for row in reader:
        results.append(row)


with open('output.json', 'w') as f:
    json.dump(results, f, indent=1, ensure_ascii=False)
