const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const tags = document.querySelectorAll(".tag");

searchBtn.addEventListener("click", fetchSpecies);

searchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        fetchSpecies();
    }
});

// Clickable hint tags
tags.forEach(tag => {
    tag.addEventListener("click", () => {
        searchInput.value = tag.textContent;
        fetchSpecies();
    });
});

async function fetchSpecies() {
    const query = searchInput.value.trim();

    if (!query) return;

    resultsDiv.innerHTML = `<p class="loading">🔎 Searching...</p>`;

    try {
        const response = await fetch(
            `https://api.gbif.org/v1/species/search?q=${query}&limit=6`
        );

        const data = await response.json();
        displayResults(data.results);

    } catch (error) {
        resultsDiv.innerHTML = "<p>Error fetching data.</p>";
        console.error(error);
    }
}

function displayResults(speciesList) {
    resultsDiv.innerHTML = "";

    if (!speciesList || speciesList.length === 0) {
        resultsDiv.innerHTML = "<p>No species found.</p>";
        return;
    }

    speciesList.forEach(species => {
        const card = document.createElement("div");
        card.classList.add("result-card");

        card.innerHTML = `
            <h3>${species.scientificName || "Unknown Name"}</h3>
            <div>
                <span class="badge">${species.kingdom || "Unknown Kingdom"}</span>
                <span class="badge">${species.rank || "Unknown Rank"}</span>
            </div>
            <p><strong>Canonical Name:</strong> ${species.canonicalName || "N/A"}</p>
            <p><strong>Status:</strong> ${species.taxonomicStatus || "N/A"}</p>
        `;

        resultsDiv.appendChild(card);
    });
}
