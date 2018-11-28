
const generateColorsButton = document.querySelector('.generate-colors');
const lockButton = document.querySelector('.lock-button');
const colors = document.querySelectorAll('.color-button');
const hexColors = document.querySelectorAll('h5');

window.addEventListener('load', () => { createPalette() });
generateColorsButton.addEventListener('click', () => { generateNewPalette() });

lockButton.addEventListener('click', () => { toggleLock() })

const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}


const createPalette = () => {
  let newColorArray = [];
  const newColors = [...colors].forEach(color => {
    // if(!)
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

const toggleLock = () => {
  lockButton.classList.toggle("active")
}