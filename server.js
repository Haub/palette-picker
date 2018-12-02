const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Welcome to Palette Picker')
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => response.status(200).json(projects))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({ 
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({error: `Error: ${error.message}`});
    });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  database('projects').insert(project, 'id')
    .then((projectIds) => response.status(200).json({message: `New project with id of ${projectIds[0]} inserted successfully.`, id: `${projectIds[0]}`}))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => response.status(200),json(palettes))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ 
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({error: `Error: ${error.message}`});
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  database('palettes').insert(palette, 'id')
    .then((paletteIds) => response.status(200).json({message: `New project with id of ${paletteIds[0]} inserted successfully.`, id: `${paletteIds[0]}`}))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).del()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ 
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({error: `Error: ${error.message}`});
    });
});

app.listen(3000, () => {
  console.log(`Palette Picker is running on ${app.get('port')}`);
});