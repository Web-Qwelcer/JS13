let $personLS = document.querySelector(".luke .person"),
  $homeworldLS = document.querySelector(".luke .homeworld"),
  $starshipsLS = document.querySelector(".luke .starships"),
  $filmsLS = document.querySelector(".luke .films"),
  $vehiclesLS = document.querySelector(".luke .vehicles"),
  $lukeS = document.querySelector('.luke'),
  $personDV = document.querySelector(".dart .person"),
  $homeworldDV = document.querySelector(".dart .homeworld"),
  $starshipsDV = document.querySelector(".dart .starships"),
  $filmsDV = document.querySelector(".dart .films"),
  $vehiclesDV = document.querySelector(".dart .vehicles"),
  $dartV = document.querySelector('.dart'),
  $personC = document.querySelector(".chew .person"),
  $homeworldC = document.querySelector(".chew .homeworld"),
  $starshipsC = document.querySelector(".chew .starships"),
  $filmsC = document.querySelector(".chew .films"),
  $vehiclesC = document.querySelector(".chew .vehicles"),
  $chewB = document.querySelector('.chew'),
  $btnLS = document.querySelector("button.btn-luke"),
  $btnDV = document.querySelector("button.btn-dart"),
  $btnC = document.querySelector("button.btn-chew");

function person(url) {
  return {
    url: url,
    response: "",
    person: "",
    homeworld: "",
    starships: "",
    vehicles: "",
    films: "",
  };
}

let lukeS = person("https://swapi.dev/api/people/1/");
let dartV = person("https://swapi.dev/api/people/4/");
let chew = person("https://swapi.dev/api/people/13/");

function loadData(obj, key) {
  if (obj[key] == undefined) return;
  let server = new XMLHttpRequest();
  let response;
  server.open("GET", obj[key], false);
  server.send();
  if (server.status != 200) {
    console.log(`SWAPI Error code ${server.status}. ${server.statusText}`);
  } else {
    response = JSON.parse(server.response);
    obj[key] = response;
  }
}

function x(obj) {
  loadData(obj, "url");
  obj.person = obj.url;
  obj.starships =
    typeof obj.url.starships === "object"
      ? obj.url.starships[0]
      : obj.url.starships;
  obj.homeworld =
    typeof obj.url.homeworld === "object"
      ? obj.url.homeworld[0]
      : obj.url.homeworld;
  obj.films =
    typeof obj.url.films === "object" ? obj.url.films[0] : obj.url.films;
  obj.vehicles =
    typeof obj.url.vehicles === "object"
      ? obj.url.vehicles[0]
      : obj.url.vehicles;
  loadData(obj, "starships");
  loadData(obj, "homeworld");
  loadData(obj, "films");
  loadData(obj, "vehicles");
}

x(lukeS);
x(dartV);
x(chew);
function personPrint(obj, place) {
  for (key in obj) {
    if (
      !Array.isArray(obj[key]) &&
      key != "episode_id" &&
      !obj[key].includes("http") &&
      !obj[key].includes("2014")
    ) {
      writeData(key.replace("_", " "), obj[key], place);
    }
  }
}

$btnLS.addEventListener("click", () => {
  $dartV.classList.remove('show')
  $chewB.classList.remove('show')
  $lukeS.classList.add('show')
  showTitle("Person", $personLS);
  personPrint(lukeS.person, $personLS);
  showTitle("Homeworld", $homeworldLS);
  personPrint(lukeS.homeworld, $homeworldLS);
  showTitle("Starships", $starshipsLS);
  personPrint(lukeS.starships, $starshipsLS);
  showTitle("Vehicles", $vehiclesLS);
  personPrint(lukeS.vehicles, $vehiclesLS);
  showTitle("Films", $filmsLS);
  personPrint(lukeS.films, $filmsLS);
});

$btnDV.addEventListener("click", () => {
  $lukeS.classList.remove('show')
  $chewB.classList.remove('show')
  $dartV.classList.add('show')
  showTitle("Person", $personDV);
  personPrint(dartV.person, $personDV);
  showTitle("Homeworld", $homeworldDV);
  personPrint(dartV.homeworld, $homeworldDV);
  showTitle("Starships", $starshipsDV);
  personPrint(dartV.starships, $starshipsDV);
  showTitle("Vehicles", $vehiclesDV);
  personPrint(dartV.vehicles, $vehiclesDV);
  showTitle("Films", $filmsDV);
  personPrint(dartV.films, $filmsDV);
});

$btnC.addEventListener("click", () => {
  $lukeS.classList.remove('show')
  $dartV.classList.remove('show')
  $chewB.classList.add('show')
  showTitle("Person", $personC);
  personPrint(chew.person, $personC);
  showTitle("Homeworld", $homeworldC);
  personPrint(chew.homeworld, $homeworldC);
  showTitle("Starships", $starshipsC);
  personPrint(chew.starships, $starshipsC);
  showTitle("Vehicles", $vehiclesC);
  personPrint(chew.vehicles, $vehiclesC);
  showTitle("Films", $filmsC);
  personPrint(chew.films, $filmsC);
});

function writeData(key, value, place) {
  let html = `<b>${key}:</b> <i>${value}</i><br/>`;
  place.insertAdjacentHTML("beforeend", html);
}

function showTitle(key, place) {
  let html = `<h3>${key}</h3>`;
  place.innerHTML = html
}
