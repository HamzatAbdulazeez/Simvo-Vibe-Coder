const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsArea = document.getElementById('resultsArea');

// Add event listener for Enter key
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

// Add event listener for button click
searchBtn.addEventListener('click', performSearch);

async function performSearch() {
  const query = searchInput.value.trim();
  
  if (!query) {
    alert('Please enter a species name');
    return;
  }
  
  // Show loading state
  resultsArea.innerHTML = '<div class="loading">Searching...</div>';
  
  try {
    const response = await fetch(`https://api.gbif.org/v1/species/search?q=${encodeURIComponent(query)}&limit=6`);
    const data = await response.json();
    
    displayResults(data.results);
  } catch (error) {
    resultsArea.innerHTML = '<div class="no-results"><h3>Error</h3><p>Failed to fetch data. Please try again.</p></div>';
  }
}

function displayResults(results) {
  if (!results || results.length === 0) {
    resultsArea.innerHTML = '<div class="no-results"><h3>No results found</h3><p>Try searching for a different species.</p></div>';
    return;
  }
  
  const ul = document.createElement('ul');
  ul.className = 'results-list';
  
  results.forEach(species => {
    const li = document.createElement('li');
    li.className = 'result-item';
    
    const scientificName = species.canonicalName || species.scientificName || 'Unknown';
    const commonName = species.vernacularName || (species.vernacularNames && species.vernacularNames[0]?.vernacularName) || '';
    const kingdom = species.kingdom || 'Unknown';
    const phylum = species.phylum || 'N/A';
    const classValue = species.class || 'N/A';
    const order = species.order || 'N/A';
    const family = species.family || 'N/A';
    const genus = species.genus || 'N/A';
    const rank = species.rank || 'Species';
    const gbifUrl = `https://www.gbif.org/species/${species.key}`;
    
    li.innerHTML = `
      <div class="species-header">
        <div class="species-name">${escapeHtml(scientificName)}</div>
        <div class="kingdom-badge">${escapeHtml(kingdom)}</div>
      </div>
      ${commonName ? `<div class="common-name">${escapeHtml(commonName)}</div>` : ''}
      <div class="taxonomy-info">
        <div class="taxonomy-item">
          <div class="tax-label">Phylum</div>
          <div class="tax-value">${escapeHtml(phylum)}</div>
        </div>
        <div class="taxonomy-item">
          <div class="tax-label">Class</div>
          <div class="tax-value">${escapeHtml(classValue)}</div>
        </div>
        <div class="taxonomy-item">
          <div class="tax-label">Order</div>
          <div class="tax-value">${escapeHtml(order)}</div>
        </div>
        <div class="taxonomy-item">
          <div class="tax-label">Family</div>
          <div class="tax-value">${escapeHtml(family)}</div>
        </div>
        <div class="taxonomy-item">
          <div class="tax-label">Genus</div>
          <div class="tax-value">${escapeHtml(genus)}</div>
        </div>
      </div>
      <div class="result-footer">
        <div class="rank-badge">${escapeHtml(rank)}</div>
        <a href="${gbifUrl}" target="_blank" class="gbif-link">View on GBIF →</a>
      </div>
    `;
    
    ul.appendChild(li);
  });
  
  resultsArea.innerHTML = '';
  resultsArea.appendChild(ul);
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
