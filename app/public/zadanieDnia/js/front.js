let list;
let listWrapper = document.getElementsByClassName('todo-list')

window.addEventListener('load', () => {
 console.log(listWrapper)
})

document.addEventListener('keydown', event => {
 if (event.keyCode === 13) {
  const id = Math.floor(Math.random() * 100);
  const payload = {
   'id': id,
   'title': event.target.value,
   'completed': false
  }

  fetch('/add', {
   method : 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body : JSON.stringify(payload)
  })

 }
});

$(function(){

 fetch('/getList', {
  method : 'GET',
  headers: {
   'Content-Type': 'application/json',
  }
 })
.then(res => res && res.ok && res.json())
.then(data => list = data)
.then(() => {
 list.forEach(item => {
  $(".todo-list").append(`<li class=${item.completed && 'completed'}>
    <div class="view">
        <input class="toggle" type="checkbox" ${item.completed && 'checked'}>
         <label>${item.title}</label>
         <button class="destroy"></button>
    </div>
</li>`);
 })
})

});
