const apiKey = "c989a2e2ef644b9db6ec4a8c9e8952fc";
const rawgURL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
const corsURL = "https://noroffcors.herokuapp.com/" + rawgURL; // added if neccessary but not needed so far.

const resultContainer = document.querySelector("#result-container")
const sectionHeading = document.querySelector(".section-header");

async function fetchFromApi() {
    sectionHeading.innerHTML = `<div class="loading-spinner">Fetching from API</div>`;

    try {
        const response = await fetch(rawgURL);
        const result = await response.json();
        if (result.results) {
            sectionHeading.innerHTML = `Results:`;
            for (let [index, item] of result.results.entries()) { // could do this with a regular for loop, but I've gotten into the habit of using for-of.
                if(index === 8) {
                    break;
                    //this break seems to work fine on its own, without the 'else' statement. I suppose that's how 'break' functions, but I added an 'else' to be safe.
                } else {
                    outputItem(index, buildItem(item), resultContainer);
                }
                
            }
        } 
    } catch (err) {
        console.error(err);
        sectionHeading.innerHTML = `Something went wrong: <p class="script-error">${err}</p>`
    }
}

function buildItem(rawItem) {

    /* 
       It seems handy to check what we received from the API call
       and use that info to create new objects to use for the HTML, 
       rather than plug in the objects directly from the API and 
       potentially receive errors related to object properties. 

       I'm not sure the default values I've provided neccessarily 
       make sense in the larger scheme of whatever website this
       would be made for.
    */

    var newItem = {
        name: "No name",
        rating: "No rating",
        tags: [],
    }

    if (rawItem.name) {
        newItem.name = rawItem.name;
    }
    if (rawItem.rating) {
        newItem.rating = rawItem.rating;
    }
    if(rawItem.tags) {
        newItem.tags = rawItem.tags;
    }

    return newItem;
}

function outputItem(index, item, container) {
    // Not really sure i need the game number id. I might just be adding whatever stuff I can think to do.
    // Should change the html for this.
    container.innerHTML += `<div class="item">
                                <ul>
                                    <li>Name: ${item.name}</li>
                                    <li>Rating: ${item.rating}</li>
                                    <li>Number of tags: ${item.tags.length}</li>
                                </ul>
                            </div>`;
                            
}

fetchFromApi();