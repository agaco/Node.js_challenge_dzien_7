window.addEventListener('load', () => {
 console.log('fdsfsdf')
})

$(function(){

 fetch('/getList', {
  method : 'GET',
  // body : JSON.stringify({
  //  name : 'Imię',
  //  surname : 'Nazwisko',
  // }),
  headers: {
   'Content-Type': 'application/json',
  }
 })
.then(res => console.log(res))

});
