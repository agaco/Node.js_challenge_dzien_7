let list;
let listWrapper = document.getElementsByClassName('todo-list')
let listParent = document.getElementsByClassName('main')
let newList = document.createElement('ul');
newList.classList.add('todo-list');

const listElement = (item) => {
 let listItem = document.createElement('li');
 let wrapper = document.createElement('div')
 let listLabel = document.createElement('label');
 let listbtn = document.createElement('button');
 let listInput = document.createElement('input');

 item.completed && listItem.classList.add('completed')
 listLabel.innerText = item.title
 listbtn.classList.add('destroy')
 listInput.classList.add('toggle')
 item.completed && listInput.setAttribute('checked', true);
 listInput.type = 'checkbox'
 wrapper.classList.add('view');
 wrapper.appendChild(listInput)
 wrapper.appendChild(listLabel)
 wrapper.appendChild(listbtn);

 listItem.appendChild(wrapper);
 listbtn.addEventListener('click', () => {
  removeEvent(item)
 });
 console.log(listItem)
 return listItem
}

//////////////////////////////////////////////////////////


fetch('/getList', {
 method : 'GET',
 headers: {'Content-Type': 'application/json',}
})
.then(res => res && res.ok && res.json())
.then(data => list = data)
.then(() => list.forEach(item => listWrapper[0].append(listElement(item))))


$(function(){

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
   listParent[0].appendChild(newList);
   return res && res.ok && res.json()
  })
  .then((data) => data.forEach(item => listWrapper[0].append(listElement(item))))
 }
});

});

const removeEvent = (event) => {
 console.log('tesst')
 // console.log(event)
}
