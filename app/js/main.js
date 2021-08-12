"use strict";

const btnDropdown = document.querySelector("#dropdownBtn");
const regions = document.querySelector(".country-change");
const chevronIcon = document.querySelector(".bi.bi-chevron-down");
const themeSwitchBtn = document.querySelector("#theme__switch");
const searchCountry = document.querySelector("#search");
const countryContainer = document.querySelector(".countries");
const form = document.querySelector(".form");

window.addEventListener("load", function (e) {
  getCountriesByRegion("asia");
  searchCountry.focus();
});

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

      dataByName.forEach((c) => {
        countryContainer.insertAdjacentHTML(
          "beforeend",
          ` <div class="country flex">
          <div class="part flag">
              <img src="${c.flag}" alt="" srcset="" class="flag">
          </div>
          <div class="part details">
              <p class="country-name">${c.name}</p>
              <p class="desc">Population: <span>${new Intl.NumberFormat(
                navigator.language
              ).format(c.population)}</span></p>
              <p class="desc">Region: <span>${c.region}</span></p>
              <p class="desc">Capital: <span>${c.capital}</span></p>
          </div>
      </div>`
        );
      });
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
      dataByRegion.forEach((c) => {
        countryContainer.insertAdjacentHTML(
          "beforeend",
          ` <div class="country flex" data-name="${c.name}">
          <div class="part flag">
              <img src="${c.flag}" alt="" srcset="" class="flag">
          </div>
          <div class="part details">
              <p class="country-name">${c.name}</p>
              <p class="desc">Population: <span>${new Intl.NumberFormat(
                navigator.language
              ).format(c.population)}</span></p>
              <p class="desc">Region: <span>${c.region}</span></p>
              <p class="desc">Capital: <span>${c.capital}</span></p>
          </div>
      </div>`
        );
      });
    }
  }
};

//------------------sort/show countries by name------------------

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let country = e.target.querySelector("#search").value;

  // country = e.target.value;
  // console.log(country);
  countryContainer.innerHTML = "";
  getCountriesByName(country);
});

//------------------sort/show countries by region------------------
regions.addEventListener("click", function (e) {
  if (e.target.classList.contains("region")) {
    countryContainer.innerHTML = "";
    getCountriesByRegion(e.target.dataset.region);
    console.log(e.target.dataset.region);
    btnDropdown.firstElementChild.textContent = `${e.target.textContent}`;
  }
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
btnDropdown.addEventListener("click", function (e) {
  e.preventDefault();
  regions.classList.toggle("hidden");
  chevronIcon.classList.toggle("rotate");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    chevronIcon.classList.remove("rotate");
    regions.classList.add("hidden");
  }
});

countryContainer.addEventListener("click", function (e) {
  // console.log(e.target.closest(".country").dataset.countryName);
  let selectedCountry = e.target.closest(".country").dataset.name;
  localStorage.setItem("cName", JSON.stringify(selectedCountry));
  window.location.href = "http://127.0.0.1:5500/app/details.html";
});
