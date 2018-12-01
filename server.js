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

});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  database('projects').insert(project, 'id')
    .then((projectIds) => response.status(200).json({message: `New project with id of ${projectIds[0]} inserted successfully.`}))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.get('/api/v1/palettes', (request, response) => {

})


app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  database('palettes').insert(palette, 'id')
    .then((paletteIds) => response.status(200).json({message: `New project with id of ${paletteIds[0]} inserted successfully.`}))
    .catch((error) => response.status(500).send({error: `Error: ${error.message}`}))
});

app.delete('/api/v1/palettes', (request, response) => {

})


app.listen(3000, () => {
  console.log(`Palette Picker is running on ${app.get('port')}`);
});