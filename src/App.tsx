import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import ResultsList from './components/ResultsList';


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

const App: React.FC = () => {
  const [results, setResults] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      alert('Please enter a species name');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await fetch(
        `https://api.gbif.org/v1/species/search?q=${encodeURIComponent(query)}&limit=6`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch {
      setError('Failed to fetch data. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="content">
          <h1>Species Catalogue</h1>
          <p className="subtitle">Find info about any species!</p>

          <SearchBox onSearch={handleSearch} />

          <p className="tip">
            Tip: Try "Panthera leo", "Monarch butterfly", or "Ginkgo biloba".
          </p>
        </div>
        <div className="results-area">
            {loading && (
              <div className="loading">Searching...</div>
            )}

            {!loading && error && (
              <div className="no-results">
                <h3>Error</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && searched && results.length === 0 && (
              <div className="no-results">
                <h3>No results found</h3>
                <p>Try searching for a different species.</p>
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <ResultsList results={results} />
            )}
          </div>
      </div>
    </div>
  );
};

export default App;
