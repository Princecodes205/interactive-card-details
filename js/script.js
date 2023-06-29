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
const finishMsg = document.querySelector(".congrats");
const finish = document.querySelector(".continue");

inputFields.forEach(function (el) {
  el.classList.remove("inputs");
});

const errorCheck = function () {
  let allConditionsMet = true; // Assume all conditions are initially met

  inputFields.forEach(function (el, i) {
    errMessge.forEach(function (elr, ier) {
      if (el.value === "" && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        allConditionsMet = false; // Set to false if any condition is not met
      } else if (el.value !== "" && ier === i) {
        el.classList.remove("inputs");
        elr.classList.add("hidden");
      }

      if (i === 1 && el.value.length > 16 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Invalid format too long";
        allConditionsMet = false;
      } else if (
        i === 1 &&
        el.value.length < 16 &&
        el.value.length > 1 &&
        ier === i
      ) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Invalid format too short";
        allConditionsMet = false;
      }

      const hasAlphabets = /[a-zA-Z]/.test(inputFields[1].value);
      if (hasAlphabets && i === 1 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "Wrong format, Numbers Only";
        allConditionsMet = false;
      }

      if (el.value.length > 2 && i === 2 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "too long";
        allConditionsMet = false;
      }

      if (el.value.length > 2 && i === 3 && ier === i) {
        el.classList.add("inputs");
        elr.classList.remove("hidden");
        elr.textContent = "too long";
        allConditionsMet = false;
      }
    });
  });

  if (lastInput.value === "") {
    lastInput.classList.add("inputs");
    allConditionsMet = false;
  } else if (lastInput.value.length > 3) {
    lastInput.classList.add("inputs");
    errin.textContent = "too long";
    allConditionsMet = false;
  } else {
    lastInput.classList.remove("inputs");
    errin.textContent = "";
  }

  return allConditionsMet;
};

const displayResults = function () {
  if (errorCheck()) {
    displayName.textContent = inputFields[0].value;
    const inputValue = inputFields[1].value.trim();
    const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    displayNumber.textContent = formattedValue;
    displayDate.textContent = `${inputFields[2].value}/${inputFields[3].value}`;
    displayCvc.textContent = inputFields[4].value;
    finishMsg.classList.remove("hide");
  } else if (inputFields.every((el) => el.value === "")) {
    finishMsg.classList.add("hide");
  } else {
    displayName.textContent = inputFields[0].value || "JANE APPLESEED";
    displayNumber.textContent = inputFields[1].value || "0000 0000 0000 0000";
    displayDate.textContent =
      `${inputFields[2].value}/${inputFields[3].value}` || "00/00";
    displayCvc.textContent = inputFields[4].value || "000";
    finishMsg.classList.add("hide");
  }
};

button.addEventListener("click", function (e) {
  e.preventDefault();
  errorCheck();
  displayResults();
});

finish.addEventListener("click", function (e) {
  e.preventDefault();
  finishMsg.classList.add("hide");
  inputFields.forEach((el) => {
    el.value = "";
    el.blur();
  });
  displayName.textContent = "JANE APPLESEED";
  displayNumber.textContent = "0000 0000 0000 0000";
  displayDate.textContent = "00/00";
  displayCvc.textContent = "000";
});
