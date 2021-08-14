"use strict";

const btnDropdown = document.querySelector("#dropdownBtn");
const themeSwitchBtn = document.querySelector("#theme__switch");
const mainWrapper = document.querySelector("main");
const flagContainer = document.querySelector(".container-flag");
const descriptionContainer = document.querySelector(".container-desc");
const neighbourCountries = document.querySelector(".surround");

//------------------ Switch theme funtionality --------------------
themeSwitchBtn.addEventListener("click", function (e) {
  const moon = e.target.closest(".theme__switch").firstElementChild;

  //change the moon icon
  moon.classList.toggle("bi-moon");
  moon.classList.toggle("bi-moon-fill");

  //add dark theme class
  document.body.classList.toggle("dark-theme");
});

//-----------render country data ---------------------
const renderCountryFlag = function (data) {
  const htmlEl = `
  <img src="${data.flag}" alt="flag" srcset="" class="flag">
  `;

  flagContainer.insertAdjacentHTML("afterbegin", htmlEl);
};

const renderCountryDescription = function (data) {
  const htmlEl = `<h3 class="country-title">${data.name}</h3>
  <div class="sect des1">
      <p>Native Name:<span> ${data.nativeName}</span></p>
      <p>Population:<span> ${Intl.NumberFormat(navigator.locale).format(
        data.population
      )}</span></p>
      <p>Region:<span> ${data.region}</span></p>
      <p>Sub Region:<span> ${data.subregion}</span></p>
      <p>Capital:<span> ${data.capital}</span></p>
  </div>
  <div class="sect des2">
      <p>Top Level Domain:<span> ${data.topLevelDomain}</span></p>
      <p>Currencies:<span> ${data.currencies[0].name} (${
    data.currencies[0].symbol
  })</span></p>
      <p>Languages:<span> ${arrayToString(data.languages)}</span></p>
  </div>`;

  descriptionContainer.insertAdjacentHTML("afterbegin", htmlEl);
};

const renderBorders = function (borderArr) {
  if (borderArr.length === 0) {
    const noBorders = `<button class="btn country-btn">
    0 Neighbouring Countries</button>`;
    neighbourCountries.insertAdjacentHTML("afterbegin", noBorders);
  }

  borderArr.forEach((border) => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)
      .then((res) => res.json())
      .then((data) => {
        const htmlEl = `<button class="btn country-btn">
                        ${data.name}</button>`;
        neighbourCountries.insertAdjacentHTML("afterbegin", htmlEl);
      })
      .catch((err) => console.log(err));
  });
};

//-------------------get country info ---------------------------

let data;
const getSelectedCountryData = async function () {
  let countryName = JSON.parse(localStorage.getItem("cName"));
  // console.log(JSON.parse(countryName));

  if (countryName) {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${countryName}`
    );
    data = await res.json();

    console.log(data);

    data.forEach((c) => {
      if (c.name === countryName) {
        renderCountryFlag(c);
        renderCountryDescription(c);
        renderBorders(c.borders);
      }
    });
  }
};

getSelectedCountryData();

const arrayToString = function (arr) {
  let langs = [];
  arr.forEach((l) => {
    langs.push(l.name);
  });
  langs = langs.join(", ");
  return langs;
};
