"use strict";
// console.log("hello");

const btnDropdown = document.querySelector("#dropdownBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const chevronIcon = document.querySelector(".bi.bi-chevron-down");
const themeSwitchBtn = document.querySelector("#theme__switch");

themeSwitchBtn.addEventListener("click", function (e) {
  const moon = e.target.closest(".theme__switch").firstElementChild;

  //change the moon icon
  moon.classList.toggle("bi-moon");
  moon.classList.toggle("bi-moon-fill");

  //add dark theme class
  document.body.classList.toggle("dark-theme");
});

//dropdown mechanism
btnDropdown.addEventListener("click", function (e) {
  dropdownMenu.classList.toggle("hidden");
  chevronIcon.classList.toggle("rotate");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    chevronIcon.classList.remove("rotate");
    dropdownMenu.classList.add("hidden");
  }
});
