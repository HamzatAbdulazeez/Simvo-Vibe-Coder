class Species:
    def __init__(self, scientific_name, authorship, kingdom,
                 habitats, threat_statuses, vernacular_name):

        self.scientific_name = scientific_name
        self.authorship = authorship
        self.kingdom = kingdom
        self.habitats = habitats
        self.threat_statuses = threat_statuses
        self.vernacular_name = vernacular_name

    def to_dict(self):
        return {
            "scientificName": self.scientific_name,
            "authorship": self.authorship,
            "kingdom": self.kingdom,
            "habitats": self.habitats,
            "threatStatuses": self.threat_statuses,
            "vernacularName": self.vernacular_name
        }
