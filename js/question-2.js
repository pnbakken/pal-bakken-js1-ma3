const apiKey = "c989a2e2ef644b9db6ec4a8c9e8952fc";
const rawgURL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
const corsURL = "https://noroffcors.herokuapp.com/" + rawgURL; // added if neccessary but not needed so far.

const resultContainer = document.querySelector("#result-container")
const sectionHeading = document.querySelector(".section-header");

async function fetchFromApi() {

    //Loader copied from w3schools.
    sectionHeading.innerHTML = `Fetching from RAWG API`;
    resultContainer.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(rawgURL);
        const result = await response.json();
        let limit = 8;
        if (result.results) {
            sectionHeading.innerHTML = `Showing ${limit} results:`; // This would be incorrect if the api returned less results than the specified limit. Could either say "showing UP TO *limit* results", or use a counter to check how many items we have, and set this html later on.
            resultContainer.innerHTML = "";
            for (let [index, item] of result.results.entries()) { // could do this with a regular for loop, but I like using for of if there's no reason not too.
                if(index === limit) {
                    break;
                    //this break seems to work fine on its own without wrapping the item output in an 'else' statement. I suppose that's how 'break' functions, but I added an 'else' to be safe.
                } else {
                    outputItem(index, buildItem(item), resultContainer);
                }
            }
        } 
    } catch (err) {
        console.error(err);
        sectionHeading.innerHTML = `Something went wrong: <p class="script-error">${err}</p>`;
        resultContainer.innerHTML = "";
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
        imgSRC: "#", // I'm just linking directly to the image url received from rawg, not sure what that means regarding terms of use.
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
    }

    return newItem;
}

function outputItem(index, item, container) {
    

    let rating; 
    if (item.rating >= 4.5) {
        rating = "high";
    } else {
        rating = "low";
    }  // Probably be better to implement this as a function and property of the item object. This is just a spur of the moment addition.

    container.innerHTML += `<div class="item">
                                <p class="item-number">${index+1}
                                <p class="game-name">${item.name}</p>
                                <img src="${item.imgSRC}" alt="${item.name} screenshot" />
                                <p>Rating: <span class="game-rating ${rating}">${item.rating}</span></p>
                                <p>Tags: <span class="game-tags">${item.tags.length}</span></p>
                            </div>`;
                            
}

fetchFromApi();