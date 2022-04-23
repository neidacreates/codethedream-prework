//get info for Leia to put on homepage
function character() {
    const leiaName = document.getElementById("leiaName");
    const leiaDataList = document.getElementById("leiaData");
    const leiaHeight = document.createElement("li");
    const leiaBirthYear = document.createElement("li");
    const leiaHome = document.createElement("li");

    fetch("https://swapi.dev/api/people/?search=leia")
        .then(res => res.json())
        .then (data => {
            // tests
            // console.log(data.results[0].films);
            // console.log(data.results[0].name)
            // console.log(data.results[0].height)
            // console.log(data.results[0].birth_year)
            // console.log(data.results[0].homeworld)

            let tempHome = (data.results[0].homeworld);
            let tempFilms = (data.results[0].films);
            
            //get info for Leia's home planet
            fetch(`${tempHome}`)
                .then(res => res.json())
                .then (data => {
                    leiaHome.innerHTML = (`Home Planet: ${data.name}`);
            })
                .catch(err => {
                    console.log(`error ${err}`);
                })

            //add info to each li
            leiaName.innerHTML = (`Character Name: ${data.results[0].name}`);
            leiaHeight.innerHTML = (`Height: ${data.results[0].height}`);
            leiaBirthYear.innerHTML = (`Birth Year: ${data.results[0].birth_year}`);
        
            //add all li to the ul on main page
            leiaDataList.appendChild(leiaHeight);
            leiaDataList.appendChild(leiaBirthYear);
            leiaDataList.appendChild(leiaHome);

            //get a list of the films she's in and add each to a list on the homepage
            getLeiaFilms(tempFilms);
    })
        .catch(err => {
            console.log(`error ${err}`);
        })
}

//get the films that leia is in and add each to the ul on homepage
function getLeiaFilms (tempFilms) {
    const leiaFilmList = document.getElementById("leiaFilmList");
    for (filmAddress in tempFilms) {
        // test:
        // console.log(tempFilms[filmAddress])
        fetch (`${tempFilms[filmAddress]}`)
            .then(res => res.json())
            .then (data => {
                const currentFilm = document.createElement("li");
                currentFilm.innerHTML = data.title;
                leiaFilmList.appendChild(currentFilm);
            })
        .catch(err => {
            console.log(`error ${err}`);
        })
    }
    const homepageButton = document.getElementById("homepageButton");
    homepageButton.style.visibility = "visible";

}

//get titles of all the films and add them to the list on films page
function films() {
    const filmsList = document.getElementById("filmList");
    fetch("https://swapi.dev/api/films")
        .then(res => res.json())
        .then(data => {
            //loop through the array of the films and extract the titles
            for (currentFilm in data.results) {
                const filmLi = document.createElement("li");
                const filmName = data.results[currentFilm].title;
                //change li content to the name of the film
                filmLi.innerHTML = filmName;
                //add a new id to each film li, id being their index in the API object
                const filmID = filmLi.id = currentFilm;
                //add film title (li) to the ul
                filmsList.appendChild(filmLi);
                //add event listener to each title
                //when each title is clicked, the info for that film will be fetched by this function getFilmDetails
                filmLi.addEventListener("click", function(){
                    getFilmDetails(filmID);
                }) 
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

};

//get info for one film and display it underneath the films list on the films page
function getFilmDetails(filmID) {
    //since index starts at 0, add 1 for the fetch link (swapi links start at 1)
    ++filmID;
    const filmInfoSection = document.getElementById("filmInfoSection");
    //fetch each film
    fetch(`https://swapi.dev/api/films/${filmID}`)
        .then(res => res.json())
        .then(data => {
            // tests:
            // console.log(data);
            // console.log(data.title);

            const filmTitle = document.createElement("h2");
            const filmDate = document.createElement("p");
            const filmCrawl = document.createElement("p");

            filmTitle.innerHTML = data.title;
            filmDate.innerHTML = `Release date: ${data.release_date}`;
            filmCrawl.innerHTML = data.opening_crawl;
            filmCrawl.className = "crawlText"

            filmInfoSection.appendChild(filmTitle);
            filmInfoSection.appendChild(filmDate);
            filmInfoSection.appendChild(filmCrawl);

            const filmButton = document.getElementById("filmButton");
            filmButton.style.visibility = "visible";


        })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

// abandoned attempt
// get character info for three characters to put on homepage
// function characters() {
//     var counting = 1

//     while (counting < 4) {
//     fetch(`https://swapi.dev/api/people/${counting}`)
//         .then(res => res.json())
//         .then (data => {
//         console.log(data)
//         var luke_name = document.getElementById("luke_name")
//     })

//     .catch(err => {
//     console.log(`error ${err}`)
//     })

//     counting++;

//     }
    
// }
