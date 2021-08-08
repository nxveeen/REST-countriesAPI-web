"use strict";

const btnDropdown = document.querySelector("#dropdownBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const chevronIcon = document.querySelector(".bi.bi-chevron-down");
const themeSwitchBtn = document.querySelector("#theme__switch");
const searchCountry = document.querySelector("#search");

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
let data;
const getData = async function (countryName) {
  if (countryName) {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${countryName}`
    );
    data = await res.json();

    if (data) {
      console.log(data);
      // let everyNames = [];
      // data.forEach((c) => {
      //   const name = c.altSpellings.join("-").replace(/ /g, "").toLowerCase();
      //   everyNames = [...everyNames, name];
      // });
      // console.log(everyNames);
    }
  }
};

// getData();
let country = "";
console.log(searchCountry);
searchCountry.addEventListener("input", function (e) {
  country = e.target.value;
  console.log(country);
  getData(country);
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

//dropdown mechanism
if (window.location.pathname === "/app/index.html") {
  btnDropdown.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownMenu.classList.toggle("hidden");
    chevronIcon.classList.toggle("rotate");
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    chevronIcon.classList.remove("rotate");
    dropdownMenu.classList.add("hidden");
  }
});
