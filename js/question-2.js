const apiKey = "c989a2e2ef644b9db6ec4a8c9e8952fc";
const rawgURL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
const corsURL = "https://noroffcors.herokuapp.com/" + rawgURL; // added if neccessary but so far so good.
const resultContainer = document.querySelector(".container1");
console.log(resultContainer);

async function fetchFromApi() {
    const response = await fetch(rawgURL);
    const result = await response.json();
    console.log(result.results);
    document.querySelector(".section-header").innerHTML = `<div class="loading-spinner">Fetching from API</div>`;
    if (result.results) {
        for (let item of result.results) {
            if(item.index === 8) {
                break;
            }
            console.log(item);
            outputItem(buildItem(item), resultContainer);
        }
    }
}

function buildItem(rawItem) {

    let cleanItem = {
        name: "No name",
        rating: "No rating",
        tags: "No tags",
    }

    if (rawItem.name) {
        this.name = rawItem.name;
    }
    if (rawItem.rating) {
        this.rating = rawItem.rating;
    }
    if(rawItem.tags) {
        this.tags = rawItem.tags.length;
    }

    return cleanItem;
}

function outputItem(item, container) {
    container.innerHTML += `<div class="item">
                                <ul>
                                    <li>Name: ${item.name}</li>
                                    <li>Rating: ${item.rating}</li>
                                    <li>Number of tags: ${item.tags}</li>
                                </ul>
                            </div>`;
                            
}

fetchFromApi();