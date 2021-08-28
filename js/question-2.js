const apiKey = "c989a2e2ef644b9db6ec4a8c9e8952fc";
const rawgURL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
const corsURL = "https://noroffcors.herokuapp.com/" + rawgURL; // added if neccessary but not needed so far.

const resultContainer = document.querySelector("#result-container")
const sectionHeading = document.querySelector(".section-header");

async function fetchFromApi() {
    //Loader copied from w3schools.
    sectionHeading.innerHTML = `Fetching from RAWG API
                                <div class="loader"></div>`;

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
                    console.log(item);
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
        imgSRC: "",
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
    if(rawItem.background_image) {
        newItem.imgSRC = rawItem.background_image;
        console.log(newItem.imgSRC);
    }

    return newItem;
}

function outputItem(index, item, container) {
    // Not really sure i need the game number id. I might just be adding whatever stuff I can think to do.
    // Should change the html for this.

    let rating;
    if (item.rating >= 4.5) {
        rating = "high";
    } else {
        rating = "low";
    }

    container.innerHTML += `<div class="item">
                                <p class="game-name">${item.name}</p>
                                <img src="${item.imgSRC}" alt="${item.name} screenshot" />
                                <p>Rating: <span class="game-rating ${rating}">${item.rating}</span></p>
                                <p>Tags: <span class="game-tags">${item.tags.length}</span></p>
                            </div>`;
                            
}

fetchFromApi();