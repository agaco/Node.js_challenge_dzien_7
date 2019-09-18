let list;
let listWrapper = document.getElementsByClassName('todo-list')

window.addEventListener('load', () => {
 console.log(listWrapper)
})

$(function(){

 fetch('/getList', {
  method : 'GET',
  headers: {
   'Content-Type': 'application/json',
  }
 })
.then(res => res && res.ok && res.json())
.then(data => list = data)
.then(() => console.log(list))
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
