import requests

BASE_URL = "https://api.gbif.org/v1/species/search"

def fetch_species(query="bird", limit=5):
    params = {
        "q": query,
        "limit": limit
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        return None
