"use strict";

const btnDropdown = document.querySelector("#dropdownBtn");
const themeSwitchBtn = document.querySelector("#theme__switch");
const mainWrapper = document.querySelector("main");

//------------------ Switch theme funtionality --------------------
themeSwitchBtn.addEventListener("click", function (e) {
  const moon = e.target.closest(".theme__switch").firstElementChild;

  //change the moon icon
  moon.classList.toggle("bi-moon");
  moon.classList.toggle("bi-moon-fill");

  //add dark theme class
  document.body.classList.toggle("dark-theme");
});

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
        const htmlEl = `<div class="container-detail">
        <div class="container-flag">
            <img src="${c.flag}" alt="flag" srcset="" class="flag">
        </div>
        <div class="container-desc">
            <h3 class="country-title">${c.name}</h3>
            <div class="sect des1">
                <p>Native Name:<span> ${c.nativeName}</span></p>
                <p>Population:<span> ${c.population}</span></p>
                <p>Region:<span> ${c.region}</span></p>
                <p>Sub Region:<span> ${c.subregion}</span></p>
                <p>Capital:<span> ${c.capital}</span></p>
            </div>
            <div class="sect des2">
                <p>Top Level Domain:<span> ${c.topLevelDomain[0]}</span></p>
                <p>Currencies:<span> ${c.currencies[0].name}</span></p>
                <p>Languages:<span> ${arrayToString(c.languages)}</span></p>
            </div>
            <div class="sect foot">
                <p class="border">Border Countries:</p>
                <div class="flex surround">
                    <button class="btn country-btn">
                        France</button>
                    <button class="btn country-btn">
                        Germany</button>
                    <button class="btn country-btn">
                        Netherlands</button>
                    <button class="btn country-btn">
                        Netherlands</button>
                    <button class="btn country-btn">
                        Netherlands</button>
                    <button class="btn country-btn">
                        Netherlands</button>
                </div>
            </div>
        </div>
    </div>`;

        mainWrapper.insertAdjacentHTML("beforeend", htmlEl);
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
