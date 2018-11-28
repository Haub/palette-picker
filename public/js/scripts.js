
const generateColorsButton = document.querySelector('.generate-colors');

const colors = document.querySelectorAll('.color-button');
const hexColors = document.querySelectorAll('h5');

window.addEventListener('load', () => { createPalette() });
generateColorsButton.addEventListener('click', () => { generateNewPalette() });

const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}

let newColorArray = [];

const createPalette = () => {
  const newColors = [...colors].map(color => {
    let newColor = createColor();
    color.style.backgroundColor = newColor;
    newColorArray.push(newColor);
  })
  newColorArray.map((hexColor, index) => hexColors[index].innerText = hexColor.toString());
  
  return newColors;
}

const generateNewPalette = () => {
  event.preventDefault();
}