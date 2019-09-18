const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); //uzywaj parsowania do body
app.use(bodyParser.json());
app.use(express.static('./public/zadanieDnia/'));

///////////////////
const dbPath = '../app/data/przykladOdczytZapis/db.json'
//////////////////

app.get('/getList', (req, res) => {
 fs.readFile(dbPath, (err, data) => {
  if (!err){
   const shoppingList = JSON.parse(data);
   res.send(shoppingList);
  } else {
   console.log('Błąd odczytu pliku', err);
   res.send('Wystąpił błąd odczytu.');
  }
 });
});













//wlacz nasłuchiwanie
app.listen(3000, () => {
 console.log('Serwer uruchomiony na porcie 3000');
});
