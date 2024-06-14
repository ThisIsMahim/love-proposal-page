const magikBtn = document.getElementById("magikBtn");
const yesBtn = document.getElementById("yesBtn");
const yesWindow = document.getElementById("yes-window");
const container = document.querySelector(".container");
const defaultPosition = { left: magikBtn.style.left, top: magikBtn.style.top };
magikBtn.addEventListener("click", () => {
  // Get the window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Get the button dimensions
  const btnWidth = magikBtn.offsetWidth;
  const btnHeight = magikBtn.offsetHeight;

  // Generate random positions within the window boundaries
  const randomX = Math.floor(Math.random() * (windowWidth - btnWidth));
  const randomY = Math.floor(Math.random() * (windowHeight - btnHeight));

  // Set the button's new position
  magikBtn.style.position = "absolute";
  magikBtn.style.left = `${randomX}px`;
  magikBtn.style.top = `${randomY}px`;
});

yesBtn.addEventListener("click", () => {
  yesWindow.style.opacity = 1;
  container.style.opacity = 0;
  yesWindow.style.zIndex = 1000;
  confetti({
    particleCount: 200,
    spread: 160,
  });

  // Roses effect
  for (let i = 0; i < 30; i++) {
    createFallingRose();
  }
});
const createFallingRose = () => {
  const rose = document.createElement("img");
  rose.src = "./rose.png"; 
  rose.className = "rose";
  document.body.appendChild(rose);

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const duration = Math.random() * 8000 + 2000;

  rose.style.left = `${startX}px`;
  rose.style.top = `${startY}px`;
  rose.style.animation = `fall ${duration}ms linear`;

  rose.addEventListener("animationend", () => {
    rose.remove();
  });
};

// Add CSS animation for falling effect
const style = document.createElement("style");
style.innerHTML = `
                @keyframes fall {
                    0% { transform: translateY(-100px); opacity: 1; }
                    100% { transform: translateY(${
                      window.innerHeight + 100
                    }px); opacity: 0; }
                }
            `;
document.head.appendChild(style);

yesWindow.addEventListener("click", () => {
  yesWindow.style.opacity = 0;
  container.style.opacity = 1;
  yesWindow.style.zIndex = -1;
  if (window.matchMedia("(max-width: 700px)").matches) {
    magikBtn.style.left = defaultPosition.left;
    magikBtn.style.top = defaultPosition.top + "550px";
  } else {
    magikBtn.style.left = defaultPosition.left;
    magikBtn.style.top = defaultPosition.top + "450px";
  }
});
// code from hyperplexed
const logo = yesWindow,
  images = logo.querySelectorAll("p");

const getActive = () => document.body.dataset.active === "true",
  setActiveTo = (active) => (document.body.dataset.active = active);

const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();

  const translationIntensity = active ? 24 : 4,
    maxTranslation = translationIntensity * (index + 1),
    currentTranslation = `${maxTranslation * rangeX}% ${
      maxTranslation * rangeY
    }%`;

  const scale = active ? 1 + index * 0.4 : 1;

  image.animate(
    {
      translate: currentTranslation,
      scale,
    },
    { duration: 750, fill: "forwards", easing: "ease" }
  );
};

const shiftAll = (images, rangeX, rangeY) =>
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));

const shiftLogo = (e, images) => {
  const rect = logo.getBoundingClientRect(),
    radius = 1000;

  const centerX = rect.left + rect.width / 2,
    centerY = rect.top + rect.height / 2;

  const rangeX = (e.clientX - centerX) / radius,
    rangeY = (e.clientY - centerY) / radius;

  shiftAll(images, rangeX, rangeY);
};

const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.4, -0.7);
};

window.onmousemove = (e) => shiftLogo(e, images);

document.body.onmouseleave = () => {
  if (!getActive()) resetLogo();
};

window.onmousedown = (e) => {
  setActiveTo(true);
  shiftLogo(e, images);
};

window.onmouseup = (e) => resetLogo();

resetLogo();
