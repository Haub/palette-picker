
const generateColors = document.querySelector('.generate-colors');

const colors = document.querySelectorAll('.color-button');

window.addEventListener('load', () => {
  createPalette();
})

const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}

const createPalette = () => {
  
  for(i=0; i<colors.length; i++) {
    colors[i].style.backgroundColor = createColor();
  }
  return;
}