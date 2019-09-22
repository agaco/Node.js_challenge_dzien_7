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

////////// ADD //////////
app.post('/add', (req, res) => {
 const message = req.body;

 ///read from file
 fs.readFile(dbPath, (err, data) => {
  if (!err){
   const shoppingList = JSON.parse(data);
   shoppingList.push(message);

   // console.log('this is shopping list', JSON.stringify(shoppingList))

   fs.writeFile(dbPath, JSON.stringify(shoppingList), (error) => {
    !error && res.send(JSON.stringify(shoppingList));
   })
   // res.send(shoppingList);
  } else {
   console.log('Błąd odczytu pliku', err);
   res.send('Wystąpił błąd odczytu.');
  }
 });
});

//////// DELETE /////////
app.delete('/del/:id', (req, res) => {
const id = parseInt(req.params.id);
 ///read from file
 fs.readFile(dbPath, (err, data) => {
  if (!err){
   const shoppingList = JSON.parse(data);
   const updatedList = shoppingList.filter(item => item.id !== id);

   fs.writeFile(dbPath, JSON.stringify(updatedList), (error) => {
    !error && res.send(JSON.stringify(updatedList));
   })
  } else {
   console.log('Błąd odczytu pliku', err);
   res.send('Wystąpił błąd odczytu.');
  }
 });

})

//////// EDIT /////////
app.post('/edit/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const payload = req.body;
 ///read from file
 fs.readFile(dbPath, (err, data) => {
  if (!err){
   const shoppingList = JSON.parse(data);
   const updatedList = shoppingList.map(item => {
     console.log(item)
     if (item.id == id) {
      const status = item.completed;
      item.completed = !status
     }
    return item
  });

   fs.writeFile(dbPath, JSON.stringify(updatedList), (error) => {
    !error && res.send(JSON.stringify(updatedList));
   })
  } else {
   console.log('Błąd odczytu pliku', err);
   res.send('Wystąpił błąd odczytu.');
  }
 });

})










//wlacz nasłuchiwanie
app.listen(3000, () => {
 console.log('Serwer uruchomiony na porcie 3000');
});
