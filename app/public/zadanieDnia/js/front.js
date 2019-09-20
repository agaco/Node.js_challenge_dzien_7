let list;
let listWrapper = document.getElementsByClassName('todo-list')


fetch('/getList', {
 method : 'GET',
 headers: {'Content-Type': 'application/json',}
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


$(function(){
window.addEventListener('load', () => {
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
  .then(res => {
   $(".todo-list")[0].remove();
   return res && res.ok && res.json()
  })
  .then((data) => {
   $(".main").append("<ul class='todo-list'></ul>")
   data.forEach(item => {
    $("ul.todo-list").append(`<li class=${item.completed && 'completed'}>
    <div class="view">
        <input class="toggle" type="checkbox" ${item.completed && 'checked'}>
         <label>${item.title}</label>
         <button class="destroy"></button>
    </div>
</li>`);
   })
  })

 }
});

});
