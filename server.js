const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('hello world');
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});