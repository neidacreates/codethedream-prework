



//get info on all the films
function films() {
fetch("https://swapi.dev/api/films")
    .then(res => res.json())
    .then (data => {
        console.log(data.results)

        


    })

    .catch(err => {
    console.log(`error ${err}`)
    })

}
//get info for Leia
function character() {
    var leiaName = document.getElementById("leiaName")
    var leiaDataList = document.getElementById("leiaData")
    var leiaFilmList = document.getElementById("leiaFilmsList")
    var leiaHeight = document.createElement("li")
    var leiaBirthYear = document.createElement("li")
    var leiaHome = document.createElement("li")
    fetch("https://swapi.dev/api/people/?search=leia")
        .then(res => res.json())
        .then (data => {
        console.log(data.results[0].films)
        // console.log(data.results[0].name)
        // console.log(data.results[0].height)
        // console.log(data.results[0].birth_year)
        // console.log(data.results[0].homeworld)

        var tempHome = (data.results[0].homeworld)
        var tempFilms = (data.results[0].films)
        // console.log(tempHome)
        
        //get info for Leia's home planet
        fetch(`${tempHome}`)
        .then(res => res.json())
        .then (data => {
            leiaHome.innerHTML = (`Home Planet: ${data.name}`)
        })

        //add info to each li
        leiaName.innerHTML = (`Character Name: ${data.results[0].name}`)
        leiaHeight.innerHTML = (`Height: ${data.results[0].height}`)
        leiaBirthYear.innerHTML = (`Birth Year: ${data.results[0].birth_year}`)
        
        //add all li to the ul on main page
        leiaDataList.appendChild(leiaHeight)
        leiaDataList.appendChild(leiaBirthYear)
        leiaDataList.appendChild(leiaHome)
        
    })

    .catch(err => {
    console.log(`error ${err}`)
    })
 
}






//get character info for three characters
// function characters() {
//     var counting = 1

//     while (counting < 4) {
//     fetch(`https://swapi.dev/api/people/${counting}`)
//         .then(res => res.json())
//         .then (data => {
//         console.log(data)
//         var luke_name=document.getElementById("luke_name")
//     })

//     .catch(err => {
//     console.log(`error ${err}`)
//     })

//     counting ++;

//     }
    
// }

