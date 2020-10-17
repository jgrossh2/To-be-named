// Scrabble Word Generator

// page elements
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var letterContainerEl = document.getElementById('possible-letters');

// global page variables
var wordLength = 0;

// event listeners to gather user input and start generator function
twoLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 2;
    // call word generator
    genWordList(wordLength, letters);
});

threeLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 3;
    // call word generator
    genWordList(wordLength, letters);
});

randomLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;

    // get total letter count
    letterCounter(letters);
    function letterCounter(letters) {
        // reset global variable
        wordLength = 0;   
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                wordLength = wordLength + 1;
            }
        }
        return wordLength;
    }
    // call word generator
    genWordList(wordLength, letters);
});

// generate all possible combinations of inputted letters
var genWordList = function(wordLength, letters) {
    // reset form container
    letterContainerEl.value = '';
    var results = [];
    var arrayCounter = 0;

    var generate = function(possWord) {
        for (var i = 0; i < letters.length; i++) {
            if (arrayCounter <= 9) {
                possWord += letters[i];
                if (possWord.length === wordLength) {
                    if (dict.includes(possWord)) {
                        results.push(possWord);
                        arrayCounter++;
                    }
                } else {
                    generate(possWord);
                }
                possWord = possWord.slice(0, -1);
            // break from loop to cut down on load time    
            } else {
                break;
            }
        }
    }
    generate("");

    // store user search / results
    localStorage.setItem(letters, results);

    displayResults(results);
    return console.log(results);
};

// When the user clicks on a button generate a list of words and then put them on the page
//for each word create a corresponding BUTTON with a info-ICON -API
//and with IMAGE corresponding to the meaning of that word -API


//create function to show words in the list
//cleate button function for modal Picture display(next step will be :get picAPI to display inside)
//document.getElementById("images").addEventListener("click", showImage);

var displayResults = function (results) {
    //check if there are any results
    if (results === 0) {
        resultsEl.textContent = "No Results Found";
    } else {
        //totalLetters.textContent = document.getElementById("results").setAttribute("button", "onclick", results);
        var new_words = [];
        //create for loop to show 5 RANDOM words from the array
        for (var i = 0; i < results.length; i++) {
            new_words.push(results[i])
            var wordDiv = document.createElement("button")
            wordDiv.textContent = results[i]
            //console.log(results[i] + "test");
            resultsEl.appendChild(wordDiv)
            wordDiv.onclick = function () {
                //console.log(test);
                showDescription(new_words);
                showImage();
                //getImg();
            }
        }
        return;
    }
}

//document.querySelector("?button").addEventListener("click");
var showDescription = function (word_array) {
    word_array.forEach(word => {
        //posWord or word you get form the dictionary
        var apiUrl = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=9197f1fd-982d-40cb-b0ef-a4e64d1afabb";
        //make a get request for url
        fetch(apiUrl)
            // Convert the response to JSON
            .then(function (response) {
                //request was sucessful
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                    });

                } else {
                    return
                }

            });
    })
}

var showImage = function () {
    var pexelURL = `https://api.pexels.com/v1/search?query=nature&per_page=5`;
    var API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";
    //add the function to fetch url, and call it above 
    fetch(pexelURL, {
        headers: {
            // Accept: 'application/json',
            Authorization: API_key
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        //console.log(response);// will display the array
        .then(function (response) {
            console.log(response.data);
            // Use 'querySelector' to get the ID of where the GIF will be displayed
            var responseContainerEl = document.querySelector('#containerimg');
            // // // Create an '<img>' element
            var pexelImg = document.createElement('img');
            //responseContainerEl.innerHTML = "";
            // // // Set that element's 'src' attribute to the 'image_url' from API response
            pexelImg.setAttribute('src', response.data);
            // // console.log(headers.url);
            responseContainerEl.appendChild(pexelImg);
        })
}
document.getElementById("images").innerHTML = "Image";
//}

class Images {
    //The constructor property returns a reference to the Object constructor function that created the instance object. Note that the value of this property is a reference to the function itself, not a string containing the function's name.
    constructor() {
        this.API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";
        //properties
        this.imagesDiv = document.querySelector(".listofpix");
        // this.searchForm = document.querySelector(".header form");
        // this.load = document.querySelector(".load");
        this.eventHandler(); //call in constructor
    }
    //add handler
    eventHandler() {
        //with function '() => ' inside the eventListener, so the images load
        document.addEventListener("DOMContentLoaded", () => {
            // get another function to get image
            this.getImg();
            //fetch image inside the Handler function:
        });
    }
    async getImg() {
        //link from PEXEL for search pic: "https://api.pexels.com/v1/search?query=nature&per_page=1"
        var pexelURL = "https://api.pexels.com/v1/curated?query=${new-words}&per_page=10";
        var data = await this.fetchImages(pexelURL); //await and async used together
        this.generateHTML(data.photos) //photos is a data=an array from pexel in console log
        console.log(data)//(response); //use 'awain in fetch function to wait for the results to load on page- get a response
        //'await' goes together with 'async' -add to var
    }
    //add the function to fetch url, and call it above 
    async fetchImages(pexelURL) {
        var response = await fetch(pexelURL, {
            method: "GET", //there are 5 methods total to use if needed
            headers: {
                Accept: 'application/json',
                Authorization: this.API_key
            }
        });
        var data = await response.json();
        // console.log(data); will display the array
        return data; //return data and store it in var data above
    }
    //per pexel documentation, include sources and give credit to photographers
    //either hardcode? or use display below the added info through classList.add
    generateHTML(photos) {
        photos.forEach(photo => {//photos in here refers to data in array from console log, when using another object- change to that
            //create var for instead of a div in html that <div class="item" for example
            var item = document.createElement("div");
            //add class
            item.classList.add("item");
            //string 
            item.innerHTML = `
            <a href="#">
             <img src="${photo.src.large}">
             <h4>${photo.photographer}</h4>
             </a>
             `;//from array of objects- change if needed a dif source displayed
            //append
            this.imagesDiv.appendChild(item);
        })
    }
}
//initialize the class
var listofpix = new Images;
//API token is: b215d9b947a47ebd06cee1f48819e44474eeff9f
//curl--header "Authorization: Token b215d9b947a47ebd06cee1f48819e44474eeff9f" https://owlbot.info/api/v4/dictionary/owl -s | json_pp

///unsplash: acess key: "epv9i5i5P0XQj0_SD3Ez8WxX88fh9d8ts18CgJKJ0Uw"; secret key: "u9UGbWywxfI-tsOZU-Lvfd-qebY5WDF47_8Nhqc2Zms" //50 requests per hour //application status 5-10 days
