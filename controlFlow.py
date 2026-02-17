from request import fetch_species
from complex import extract_species_data

def process_species():
    data = fetch_species("bird", 10)

    if not data:
        print("No data returned.")
        return

    results = data.get("results", [])

    if not results:
        print("No species found.")
        return

    for index, item in enumerate(results, start=1):
        extracted = extract_species_data(item)
        print(f"\nSpecies {index}")
        print("---------------------")
        for key, value in extracted.items():
            print(f"{key}: {value}")
