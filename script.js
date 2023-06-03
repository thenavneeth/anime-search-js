document.getElementById("search-button").addEventListener("click", function() {
  var searchTerm = document.getElementById("search-input").value;

  fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query ($search: String) {
          Page {
            media(search: $search, type: ANIME) {
              title {
                romaji
              }
              description
              coverImage {
                large
              }
            }
          }
        }
      `,
      variables: {
        search: searchTerm,
      },
    }),
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayResults(data.data.Page.media);
    })
    .catch(function(error) {
      console.log("An error occurred: " + error);
    });
});

function displayResults(data) {
  var resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML = "No results found.";
    return;
  }

  data.forEach(function(anime) {
    var animeTitle = document.createElement("h3");
    animeTitle.textContent = anime.title.romaji;

    var animeDescription = document.createElement("p");
    animeDescription.textContent = anime.description;

    var animeImage = document.createElement("img");
    animeImage.src = anime.coverImage.large;

    resultsContainer.appendChild(animeTitle);
    resultsContainer.appendChild(animeDescription);
    resultsContainer.appendChild(animeImage);
  });
}
