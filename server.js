const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (response, request) => {
  response.send('Welcome to Palette Picker')
})

app.get('/api/v1/projects', (request, response) => {

});

app.get('/api/v1/palettes', (request, response) => {
  
});

app.post('/api/v1/projects', (request, response) => {
});

app.post('api/v1/palettes', (request, response) => {

});

app.listen(3000, () => {
  console.log(`Palette Picker is running on ${app.get('port')}`);
});