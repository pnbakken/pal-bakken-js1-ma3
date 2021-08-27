const apiKey = "c989a2e2ef644b9db6ec4a8c9e8952fc";
const rawgURL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
const corsURL = "https://noroffcors.herokuapp.com/" + rawgURL; // added if neccessary but so far so good.

const resultContainer = document.querySelector("#result-container")
const sectionHeading = document.querySelector(".section-header");

async function fetchFromApi() {
    sectionHeading.innerHTML = `<div class="loading-spinner">Fetching from API</div>`;

    try {
        const response = await fetch(rawgURL);
        const result = await response.json();
        if (result.results) {
            sectionHeading.innerHTML = `Results:`;
            for (let [index, item] of result.results.entries()) { // could do this with a plain for loop, but I've gotten into the habit of using for-of.
                if(index === 8) {
                    break;
                }
                outputItem(buildItem(item), resultContainer);
            }
        } 
    } catch (err) {
        console.error(err);
        sectionHeading.innerHTML = `Something went wrong: <p>${err}</p>`
    }
}

function buildItem(rawItem) {

    var cleanItem = {
        name: "No name",
        rating: "No rating",
        tags: [],

    }

    if (rawItem.name) {
        cleanItem.name = rawItem.name;
    }
    if (rawItem.rating) {
        cleanItem.rating = rawItem.rating;
    }
    if(rawItem.tags) {
        cleanItem.tags = rawItem.tags;
    }

    return cleanItem;
}

function outputItem(item, container) {
    container.innerHTML += `<div class="item">
                                <ul>
                                    <li>Name: ${item.name}</li>
                                    <li>Rating: ${item.rating}</li>
                                    <li>Number of tags: ${item.tags.length}</li>
                                </ul>
                            </div>`;
                            
}

fetchFromApi();