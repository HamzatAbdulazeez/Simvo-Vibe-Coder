def extract_species_data(item):

    # Extract vernacular name based on priority
    vernacular_names = item.get('vernacularNames', [])
    vernacular_name = None

    for vn in vernacular_names:
        if vn.get('language') == 'eng':
            vernacular_name = vn.get('vernacularName')
            break

    if not vernacular_name and vernacular_names:
        vernacular_name = vernacular_names[0].get('vernacularName')

    extracted_item = {
        'scientificName': item.get('scientificName', ''),
        'authorship': item.get('authorship', ''),
        'kingdom': item.get('kingdom', ''),
        'habitats': item.get('habitats', []),
        'threatStatuses': item.get('threatStatuses', []),
        'vernacularName': vernacular_name
    }

    return extracted_item
