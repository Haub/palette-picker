const loadPalettePicker = () => {
  createPalette();
  getProjects();
};

const createColor = () => {
  return '#' + ('000000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
};

const createPalette = () => {
  let newColorArray = [];
  
const colors = document.querySelectorAll('.color-button');
  const newColors = [...colors].forEach((color, index) => {
    if(!$(color).children('button').hasClass('active')) {
      let newColor = createColor().toUpperCase();
      $(color).css('background-color', newColor);
      $(color).children('h5').text(newColor)
      newColorArray.push(newColor.toString().toUpperCase());
    }
  })  
  return newColors;
};

const generateNewPalette = () => {
  event.preventDefault();
  createPalette();
};

const toggleLock = (event) => {
  let activeButton = event.target;
  activeButton.classList.toggle("active")
};

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
};

const postPalette = async(palette) => {
  const response = await fetch('/api/v1/palettes', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(palette)
  })
  const newPalette = await response.json();
  return newPalette
  // addProjects(palette)
};

const saveProject = (event) => {
  event.preventDefault();
  let name = $('.project-input').val();
  let project = {
    name
  }
  postProject(project)
  $('form :input').val('');
};

const postProject = async(project) => {
  const response = await fetch('/api/v1/projects', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(project)
  })
  const result = await response.json(); 
  // addProjects(result);

  // $(`#${project.id}`).append(`<option value='${project.id}'>${project.name}</option>`);
  // $('.featured-project').append(`
  //     <h6 class="project-name" value = ${project.id}>${project.name}</h6>
  //   `)
  getProjects();
};

const getProjects = async() => {
  const response = await fetch('/api/v1/projects')
  const projects = await response.json()
  addProjects(projects)
};

const addProjects = (projects) => {
  projects.forEach((project) => {
    getPalettes(project)
    $('.project-options').append(`<option value='${project.id}'>${project.name}</option>`);
    $('.featured-project').append(`
      <h6 class="project-name" value = ${project.id}>${project.name}</h6>
      <div class="palette" id=${project.id}"></div>
    `)
  })
};

const getPalettes = async(project) => {

  const response = await fetch('/api/v1/palettes');
  const palettes = await response.json();
  
  palettes.forEach(palette => {
    if(palette.project_id === project.id)
      // $(`#${palette.project_id}`).append(`

      $('.palette').append(`

        <div class="palette-div" id="{palette.id}">
          <h4 value = ${palette.id} class="palette-name" id=${palette.id}>${palette.name}<span><button class="delete" value = ${palette.id}></button></span></h4>
          <div class="scoop" value="${palette.color1}" style="background-color:${palette.color1}"></div>  
          <div class="scoop" value="${palette.color2}" style="background-color:${palette.color2}"></div>  
          <div class="scoop" value="${palette.color3}" style="background-color:${palette.color3}"></div>  
          <div class="scoop" value="${palette.color4}" style="background-color:${palette.color4}"></div>  
          <div class="scoop" value="${palette.color5}" style="background-color:${palette.color5}"></div>  
          <div class="cone"></div>
        </div>  
      `)     
  })
};

const removePalette = async(event) => {
  let id = event.target.value;
  const response = await fetch(`/api/v1/palettes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  });
  const palette = await response.json();
  $(event.target).closest(`#${id}`).remove();
};


$(window).on('load', loadPalettePicker); 
$('.generate-colors').on('click', generateNewPalette);
$('.lock-button').click(toggleLock);
$('.project-form').submit(saveProject);
$('.palette-form').submit(savePalette);
$('.featured-project').click('.delete', removePalette)
        
    
