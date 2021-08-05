"use strict";
// console.log("hello");

const btnDropdown = document.querySelector("#dropdownBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const chevronIcon = document.querySelector(".bi.bi-chevron-down");

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
