projectsData = [
  {
    name: 'Project1',
    colors: [{name: 'Palette3', color1: '#ffffff', color2: '#123456', color3: '#h6sn9a', color4: '#823hss', color5: '#l9a87s'}, {name: 'Palette32', color1: '#ffffff', color2: '#123456', color3: '#h6sn9a', color4: '#823hss', color5: '#l9a87s'}]
  },
  {
    name: 'Project2',
    colors: [{name: 'Palette13', color1: '#ffffff', color2: '#123456', color3: '#h6sn9a', color4: '#823hss', color5: '#l9a87s'}, {name: 'Palette303', color1: '#ffffff', color2: '#123456', color3: '#h6sn9a', color4: '#823hss', color5: '#l9a87s'}]
  } 
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name,
  }, 'id')
  .then(projectIds => {
    let palettePromises = project.colors.map(palette => {
      console.log(palette)
      return createPalette(knex, {
        name: palette.name, 
        ...palette,
        project_id: projectIds[0]
      })
    })

    return Promise.all(palettePromises)
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}


exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = projectsData.map(project => {
        return createProject(knex, project)
      })

      return Promise.all(projectPromises)
    })
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db: ${error.message}`))
};