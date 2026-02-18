import React from 'react';

interface Species {
  key: number;
  canonicalName?: string;
  scientificName?: string;
  vernacularName?: string;
  vernacularNames?: Array<{ vernacularName: string }>;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  rank?: string;
}

interface SpeciesCardProps {
  species: Species;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const scientificName = species.canonicalName || species.scientificName || 'Unknown';
  const commonName =
    species.vernacularName ||
    (species.vernacularNames && species.vernacularNames[0]?.vernacularName) ||
    '';
  const kingdom = species.kingdom || 'Unknown';
  const phylum = species.phylum || 'N/A';
  const classValue = species.class || 'N/A';
  const order = species.order || 'N/A';
  const family = species.family || 'N/A';
  const genus = species.genus || 'N/A';
  const rank = species.rank || 'Species';
  const gbifUrl = `https://www.gbif.org/species/${species.key}`;

  return (
    <li className="result-item">
      <div className="species-header">
        <div className="species-name">{scientificName}</div>
        <div className="kingdom-badge">{kingdom}</div>
      </div>
      
      {commonName && <div className="common-name">{commonName}</div>}
      
      <div className="taxonomy-info">
        <div className="taxonomy-item">
          <div className="tax-label">Phylum</div>
          <div className="tax-value">{phylum}</div>
        </div>
        <div className="taxonomy-item">
          <div className="tax-label">Class</div>
          <div className="tax-value">{classValue}</div>
        </div>
        <div className="taxonomy-item">
          <div className="tax-label">Order</div>
          <div className="tax-value">{order}</div>
        </div>
        <div className="taxonomy-item">
          <div className="tax-label">Family</div>
          <div className="tax-value">{family}</div>
        </div>
        <div className="taxonomy-item">
          <div className="tax-label">Genus</div>
          <div className="tax-value">{genus}</div>
        </div>
      </div>
      
      <div className="result-footer">
        <div className="rank-badge">{rank}</div>
        <a href={gbifUrl} target="_blank" rel="noopener noreferrer" className="gbif-link">
          View on GBIF →
        </a>
      </div>
    </li>
  );
};

export default SpeciesCard;
