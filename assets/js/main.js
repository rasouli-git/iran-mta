const nav = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger-menu");
const backDrop = document.querySelector(".backdrop");
hamburger.addEventListener("click", (e) => {
  nav.classList.add("active");
});

backDrop.addEventListener("click", () => {
  nav.classList.remove("active");
});




var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });






const radius = 340;
const autoRotate = true;
const rotateSpeed = -60;
const imgWidth = 180;
const imgHeight = 250;

setTimeout(init, 1000);

const odrag = document.querySelector("#drag");
const ospin = document.querySelector("#spin");
const aImg = ospin.getElementsByTagName("img");
let aEle = [...aImg];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// const ground = document.querySelector("#ground");
// ground.style.width = radius * 3 + "px";
// ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = `rotateY(${(i * 360) / aEle.length}deg)
        translateZ(${radius}px)`;

    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}

let sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

if (autoRotate) {
  let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  let sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    let nX = e.clientX;
    nY = e.clientY;

    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;

    applyTransform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;

      applyTransform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);

    this.onpointermove = this.onpointerup = null;
  };
  return false;
};
