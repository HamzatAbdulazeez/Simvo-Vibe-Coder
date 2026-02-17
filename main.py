from services.api_service import fetch_data
from services.extractor import extract_species_data

def main():
    url = "https://api.gbif.org/v1/species/search?q=bird"

    data = fetch_data(url)

    if data:
        results = data.get("results", [])
        extracted = []

        for item in results:
            extracted_item = extract_species_data(item)
            extracted.append(extracted_item)

        for species in extracted:
            print(species)

if __name__ == "__main__":
    main()
