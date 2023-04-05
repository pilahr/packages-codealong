import "./style.scss";
import confetti from "canvas-confetti";
import ColorThief from "colorthief";

const colorThief = new ColorThief();

const confettiButton =
  document.querySelector<HTMLButtonElement>("#confetti-button");
const dogImage = document.querySelector<HTMLImageElement>("#dog-image");
const imageUrlInput = document.querySelector("#image-url-input");

if (!confettiButton || !dogImage || !imageUrlInput) {
  throw new Error("Issue with selectors");
}

const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const fireConfetti = () => {
  const confettiOptions = {
    particleCount: randomInRange(50, 100),
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    origin: { y: 0.6 },
    colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
  };

  confetti(confettiOptions);
};

const onImageLoad = () => {
  const color: number[] = colorThief.getColor(dogImage);
  const body = document.querySelector<HTMLBodyElement>("body");

  body!.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

  fireConfetti();
};

const handleUrlInput = (event: Event) => {
  dogImage.src = (event.currentTarget as HTMLInputElement).value;
};

confettiButton.addEventListener("click", fireConfetti);
imageUrlInput.addEventListener("input", handleUrlInput);
dogImage.addEventListener("load", onImageLoad);

// make sure to fire if the image has already loaded
if (dogImage.complete) {
  onImageLoad();
}
