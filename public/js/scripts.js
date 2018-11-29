
const generateColorsButton = document.querySelector('.generate-colors');
const lockButton = document.querySelectorAll('.lock-button');
// const colorParent = document.querySelector('.color');
// const lockButton = document.getElementsByClassName('.lock-button');
const colors = document.querySelectorAll('.color-button');
const hexColors = document.querySelectorAll('h5');

window.addEventListener('load', () => { createPalette() });
generateColorsButton.addEventListener('click', () => { generateNewPalette() });


const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}


const createPalette = () => {
  let newColorArray = [];
  const newColors = [...colors].forEach(color => {
    let newColor = createColor();
    color.style.backgroundColor = newColor;
    newColorArray.push(newColor);
  })
  newColorArray.map((hexColor, index) => hexColors[index].innerText = hexColor.toString());
  
  return newColors;
}

const generateNewPalette = () => {
  event.preventDefault();
  createPalette();
}

const toggleLock = (event) => {
  let activeButton = event.target;
  activeButton.classList.toggle("active")
}

lockButton.forEach(function(elem) {
    elem.addEventListener("click", (event) => {
    toggleLock(event)  
    });
});
