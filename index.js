//-------------------the game starter---------------------------
let myGameEntry = document.querySelector(".gameStarter"),
  startButton = document.querySelector(".startBtn"),
  userName = document.querySelector(".nameContainer .name"),
  userTries = document.querySelector(".nameContainer .score .tries"),
  failRingTone = document.getElementById("fail"),
  successRingTone = document.getElementById("success"),
  lostRingTone = document.getElementById("lost");

startButton.addEventListener("click", () => {
  let name = window.prompt("Enter your name please");
  let tries = window.prompt("Enter The Numbers Of Tries You Want");
  if (name === "" || name === null) {
    userName.innerHTML = `name: unknown`;
  } else {
    userName.innerHTML = `name: ${name.trim()}`;
  }
  if (!parseInt(tries) || tries === null) {
    userTries.innerHTML = `20`;
  } else {
    userTries.innerHTML = `${parseInt(tries.trim())}`;
  }
  startButton.parentElement.remove();
});
//---------------call Back Function for the button event listner---
//-------------------------shuffling th card-----------------------------
//shuffle functuion
function shuffle(array) {
  let myArrayLength = array.length;
  while (myArrayLength > 0) {
    let random = Math.floor(Math.random() * myArrayLength);
    myArrayLength--;
    [array[myArrayLength], array[random]] = [array[random], array[myArrayLength]];
  }
  return array;
}
let boxes = document.querySelectorAll(".box"),
  boxesOrder = Array.from(boxes.keys());
shuffle(boxesOrder);
boxes.forEach((box, index) => {
  box.style.order = boxesOrder[index];
});
//--------------------flipping and matchin card-----------------------
let carteContainer = document.querySelector(".carteContainer");
boxes.forEach((box) => {
  box.addEventListener("click", function () {
    box.classList.add("isflipped");
    let flippedBoxes = document.querySelectorAll(".isflipped");
    if (flippedBoxes.length >= 2) {
      carteContainer.style.cssText = " pointer-events: none;";
      setTimeout(() => {
        carteContainer.style.cssText = " pointer-events: initial;";
      }, 1000);
      matchFlippedBoxes(flippedBoxes[0], flippedBoxes[1]);
    }
  });
});

// ---------------------matching function---------------------------------
function matchFlippedBoxes(f1, f2) {
  let tries = userTries.innerHTML;
  if (f1.dataset.tech === f2.dataset.tech) {
    f1.classList.add("ismatched");
    f2.classList.add("ismatched");
    f1.classList.remove("isflipped");
    f2.classList.remove("isflipped");
    successRingTone.play();
  } else {
    setTimeout(() => {
      f1.classList.remove("isflipped");
      f2.classList.remove("isflipped");
    }, 1000);
    failRingTone.play();
    tries = parseInt(tries) - 1;
    userTries.innerHTML = tries;
  }
  lost(userTries.textContent);
  won(userTries.textContent);
}

//-------------------lost------------------
function lost(t) {
  if (parseInt(t) === 0) {
    setTimeout(() => {
      lostRingTone.play();
      carteContainer.style.cssText = " pointer-events: none;";
      let lostpopup = document.createElement("div");
      lostpopup.className = "gameStarter";
      let paragraphe = document.createElement("p");
      paragraphe.className = "greeting";
      paragraphe.textContent = "Sadly you lost better luck next time";
      let button = document.createElement("button");
      button.addEventListener("click", () => {
        window.location.reload();
      });
      button.className = "startBtn";
      button.innerText = "play again";
      lostpopup.appendChild(paragraphe);
      lostpopup.appendChild(button);
      document.body.appendChild(lostpopup);
    }, 1500);
  }
}
function won(t) {
  let matched = document.querySelectorAll(".ismatched");
  console.log(matched.length);
  if (t > 0 && matched.length === boxesOrder.length) {
    setTimeout(() => {
      document.getElementById("won").play();
      carteContainer.style.cssText = " pointer-events: none;";
      let lostpopup = document.createElement("div");
      lostpopup.className = "gameStarter";
      let paragraphe = document.createElement("p");
      paragraphe.className = "greeting";
      paragraphe.textContent = "you won congrats!!!!!!!!!!!!!";
      let button = document.createElement("button");
      button.addEventListener("click", () => {
        window.location.reload();
      });
      button.className = "startBtn";
      button.innerText = "play again";
      lostpopup.appendChild(paragraphe);
      lostpopup.appendChild(button);
      document.body.appendChild(lostpopup);
    }, 1500);
  }
}
