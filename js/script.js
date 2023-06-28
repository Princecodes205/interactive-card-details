"use strict";
const inputFields = Array.from(document.querySelectorAll(".inputval"));
const errMessge = Array.from(document.querySelectorAll(".error"));
const displayName = document.querySelector(".inputName");
const displayNumber = document.querySelector(".inputNumber");
const displayDate = document.querySelector(".inputDate");
const displayCvc = document.querySelector(".inputCvc");
const lastInput = document.querySelector(".lastin");
const errin = document.querySelector(".cvc2");
const button = document.querySelector(".confirm");

inputFields.forEach(function (el) {
  el.classList.remove("inputs");
});

const errorCheck = function () {
  inputFields.forEach((el, i) => {
    errMessge.forEach((elr, ier) => {
      if (el.value === "" && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
      } else if (el.value !== "" && ier === i) {
        el.classList.remove("inputs");
        elr.classList.add("hidden");
      }

      if (i === 1 && el.value.length > 19 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Invalid format too long";
      } else if (
        i === 1 &&
        el.value.length < 19 &&
        el.value.length > 1 &&
        ier === i
      ) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Invalid format too short";
      }
      const hasAlphabets = /[a-zA-Z]/.test(inputFields[1].value);

      if (hasAlphabets && i === 1 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Wrong format, Numbers Only";
      }

      if (el.value.length > 2 && i === 2 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "too long";
      }

      if (el.value.length > 2 && i === 3 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "too long";
      }
    });
  });

  if (lastInput.value === "") {
    lastInput.classList.add("inputs");
  } else if (lastInput.value.length > 3) {
    lastInput.classList.add("inputs");
    errin.textContent = "too long";
  } else {
    lastInput.classList.remove("inputs");
    errin.textContent = "";
  }
};

const displayResults = function () {
  let errors = errorCheck();
  if (!errors) {
    displayName.textContent = inputFields[0].value || "JANE APPLESEED";
    displayNumber.textContent = inputFields[1].value || "0000 0000 0000 0000";
    displayDate.textContent =
      `${inputFields[2].value}/${inputFields[3].value}` || "00/00";
    displayCvc.textContent = inputFields[4].value || "000";
  } else {
    displayName.textContent = "JANE APPLESEED";
    displayNumber.textContent = "0000 0000 0000 0000";
    displayDate.textContent = "00/00";
  }
};

button.addEventListener("click", function (e) {
  e.preventDefault();
  errorCheck();
  displayResults();
});
