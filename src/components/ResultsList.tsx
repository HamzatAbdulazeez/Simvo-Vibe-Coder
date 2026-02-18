import React from 'react';
import SpeciesCard from './SpeciesCard';

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

interface ResultsListProps {
  results: Species[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <ul className="results-list">
      {results.map((species) => (
        <SpeciesCard key={species.key} species={species} />
      ))}
    </ul>
  );
};

export default ResultsList;
