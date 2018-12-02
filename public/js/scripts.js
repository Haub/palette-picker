
const colors = document.querySelectorAll('.color-button');
const hexColors = document.querySelectorAll('h5');

const loadPalettePicker = () => {
  createPalette();
  getProjects();
}

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
  postPalette(palette);
  $('form :input').val('');
  $('.lock-button').removeClass('active');
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
  $('form :input').val('');
}

const postProject = async(project) => {
  const response = await fetch('/api/v1/projects', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(project)
  })
  const result = await response.json();
  $('.project-options').append(`<option value='${result.id}'>${project.name}</option>`);
}

const getProjects = async() => {
  const response = await fetch('/api/v1/projects')
  const projects = await response.json()
  addProjects(projects)
}

const addProjects = (projects) => {
  projects.forEach((project) => {
    // $('.featured-project').append(`<h6 value = ${project.id}>${project.name}</h6>`)
    getPalettes(project)
    $('.project-options').append(`<option value='${project.id}'>${project.name}</option>`)
  })
}

const getPalettes = async(project) => {

  const response = await fetch('/api/v1/palettes');
  const palettes = await response.json();
  $('.featured-project').append(`
    <h6 class="project-name" value = ${project.id}>${project.name}</h6>
    <br>
  `)
  
  palettes.forEach(palette => {
    if(palette.project_id === project.id)

      $('.project-name').append(`
        <span>
          <h4 value = ${palette.id}>${palette.name}</h6>
          <div class="scoop" value="${palette.color1}" style="background-color:${palette.color1}"></div>  
          <div class="scoop" value="${palette.color2}" style="background-color:${palette.color2}"></div>  
          <div class="scoop" value="${palette.color3}" style="background-color:${palette.color3}"></div>  
          <div class="scoop" value="${palette.color4}" style="background-color:${palette.color4}"></div>  
          <div class="scoop" value="${palette.color5}" style="background-color:${palette.color5}"></div>  
          
          <div class="cone"></div>  
        </span>
      `)     
  })
}


$(window).on('load', loadPalettePicker); 
$('.generate-colors').on('click', generateNewPalette);
$('.lock-button').click(toggleLock);
$('.project-form').submit(saveProject);
$('.palette-form').submit(savePalette);
// $('.featured-project').on('click', getPalettes)
        
    
