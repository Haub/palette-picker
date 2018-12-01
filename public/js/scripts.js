
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

const savePalette = (event) => {
  event.preventDefault();
  let palette = {
    name : $('.palette-input').val(),
    color1: $('.color1').text(),
    color2: $('.color2').text(),
    color3: $('.color3').text(),
    color4: $('.color4').text(),
    color5: $('.color5').text(),
    project_id: $('.project-options option:selected').val()
  }
  console.log(palette)
  postPalette(palette);
  $('form :input').val(''); 
}

const postPalette = async(palette) => {
  const response = await fetch('/api/v1/palettes', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(palette)
  })
  return await response.json();
}

const saveProject = (event) => {
  event.preventDefault();
  let name = $('.project-input').val();
  let project = {
    name
  }
  postProject(project)

}

const postProject = async(project) => {
  const response = await fetch('/api/v1/projects', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(project)
  })
  return await response.json();
}


$(window).on('load', createPalette); 
$('.generate-colors').on('click', generateNewPalette);
$('.lock-button').click(toggleLock);
$('.project-form').submit(saveProject);
$('.palette-form').submit(savePalette);
        
    
