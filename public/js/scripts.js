
const colors = document.querySelectorAll('.color-button');
const hexColors = document.querySelectorAll('h5');

const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}

const createPalette = () => {
  let newColorArray = [];
  const newColors = [...colors].forEach((color, index) => {
    if(!$(color).children('button').hasClass('active')) {
      let newColor = createColor().toUpperCase();
      $(color).css('background-color', newColor);
      $(color).children('h5').text(newColor)
      newColorArray.push(newColor.toString().toUpperCase());
    }
  })  
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


$(window).on('load', createPalette); 
$('.generate-colors').on('click', generateNewPalette);
$('.lock-button').click(toggleLock);
$('.').click(saveProject)
$("#btn1").click(savePalette);
        
    });
