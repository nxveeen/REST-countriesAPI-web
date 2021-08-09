"use strict";

const btnDropdown = document.querySelector("#dropdownBtn");
const regions = document.querySelector(".country-change");
const chevronIcon = document.querySelector(".bi.bi-chevron-down");
const themeSwitchBtn = document.querySelector("#theme__switch");
const searchCountry = document.querySelector("#search");
const countryContainer = document.querySelector(".countries");

// ----------------get visitor's location ----------------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// ----------------watch visitor's location----------------
function watchLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, handleError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function handleError(error) {
  let errorStr;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorStr = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorStr = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorStr = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorStr = "An unknown error occurred.";
      break;
    default:
      errorStr = "An unknown error occurred.";
  }
  console.error("Error occurred: " + errorStr);
}

function showPosition(position) {
  console.log(
    `Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`
  );
}

getLocation();

//----------------fetch data from RestCountries API----------------
let dataByName;
let dataByRegion;

// fetching countries by name
const getCountriesByName = async function (countryName) {
  if (countryName) {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${countryName}`
    );
    dataByName = await res.json();

    if (dataByName) {
      console.log(dataByName);
      // let everyNames = [];
      // data.forEach((c) => {
      //   const name = c.altSpellings.join("-").replace(/ /g, "").toLowerCase();
      //   everyNames = [...everyNames, name];
      // });
      // console.log(everyNames);
    }
  }
};

// fetching countries by region
const getCountriesByRegion = async function (region) {
  if (region) {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/region/${region}`
    );
    dataByRegion = await res.json();

    if (dataByRegion) {
      // console.log(dataByRegion);

      dataByRegion.forEach((c) => {
        // console.log(c.name);
        countryContainer.insertAdjacentHTML(
          "beforeend",
          ` <div class="country flex" onclick="window.open('http://127.0.0.1:5500/app/details.html','_self')">
          <div class="part flag">
              <img src="${c.flag}" alt="" srcset="" class="flag">
          </div>
          <div class="part details">
              <p class="country-name">${c.name}</p>
              <p class="desc">Population: <span>${c.population}</span></p>
              <p class="desc">Region: <span>${c.region}</span></p>
              <p class="desc">Capital: <span>${c.capital}</span></p>
          </div>
      </div>`
        );
      });
      // let everyNames = [];
      // data.forEach((c) => {
      //   const name = c.altSpellings.join("-").replace(/ /g, "").toLowerCase();
      //   everyNames = [...everyNames, name];
      // });
      // console.log(everyNames);
    }
  }
};

//------------------sort/show countries by name------------------

searchCountry.addEventListener("input", function (e) {
  let country = "";
  country = e.target.value;
  console.log(country);
  getCountriesByName(country);
});

//------------------sort/show countries by region------------------
regions.addEventListener("click", function (e) {
  // console.log(e.target.dataset.region);
  // console.log(e.target.textContent);
  // console.log(btnDropdown.firstElementChild);
  countryContainer.innerHTML = "";
  getCountriesByRegion(e.target.dataset.region);
  btnDropdown.firstElementChild.textContent = `${e.target.textContent}`;
});

//------------------ Switch theme funtionality --------------------
themeSwitchBtn.addEventListener("click", function (e) {
  const moon = e.target.closest(".theme__switch").firstElementChild;

  //change the moon icon
  moon.classList.toggle("bi-moon");
  moon.classList.toggle("bi-moon-fill");

  //add dark theme class
  document.body.classList.toggle("dark-theme");
});

//------------------dropdown mechanism------------------
if (window.location.pathname === "/app/index.html" || "/app/") {
  btnDropdown.addEventListener("click", function (e) {
    e.preventDefault();
    regions.classList.toggle("hidden");
    chevronIcon.classList.toggle("rotate");
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    chevronIcon.classList.remove("rotate");
    regions.classList.add("hidden");
  }
});

//-------------------update the UI-------------------
