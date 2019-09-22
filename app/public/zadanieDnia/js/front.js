let list;
let listWrapper = document.getElementsByClassName('todo-list');
let listParent = document.getElementsByClassName('main');
// let newList = document.createElement('ul');
// newList.classList.add('todo-list');

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
 listInput.addEventListener('click', () => {
  editItem(item)
 });
 return listItem
};

////////// get list ////////////////
fetch('/getList', {
 method : 'GET',
 headers: {'Content-Type': 'application/json',}
})
.then(res => res && res.ok && res.json())
.then(data => list = data)
.then(() => list.forEach(item => listWrapper[0].append(listElement(item))))


////// ad item //////////////
document.addEventListener('keydown', event => {
 if (event.keyCode === 13) {
  const id = Math.floor(Math.random() * 100);
  const payload = {
   'id': id,
   'title': event.target.value,
   'completed': false
  };

  fetch('/add', {
   method : 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body : JSON.stringify(payload)
  })
  .then(res => {
   // console.log('listWrappper', listWrapper)
   // console.log('dynamic ', document.getElementsByClassName('todo-list'))
   let newList = document.createElement('ul');
   newList.classList.add('todo-list');
   listWrapper[0].remove();
   listParent[0].appendChild(newList);
   return res && res.ok && res.json()
  })
  .then((data) => data.forEach(item => listWrapper[0].append(listElement(item))))
 }
});


///// deleting //////////

const removeEvent = (event) => {
 fetch(`/del/${event.id}`, {
  method : 'DELETE',
  headers: {'Content-Type': 'application/json',}
 })
 .then(res => {
    let newList = document.createElement('ul');
    newList.classList.add('todo-list');
    listWrapper[0].remove();
    listParent[0].appendChild(newList);
    return res && res.ok && res.json()
 })
 .then((data) => data.forEach(item => listWrapper[0].append(listElement(item))))

}

///// deleting //////////

const editItem = (event, key) => {
 fetch(`/edit/${event.id}`, {
  method : 'POST',
  headers: {'Content-Type': 'application/json',}
 })
 .then(res => {
  let newList = document.createElement('ul');
  newList.classList.add('todo-list');
  listWrapper[0].remove();
  listParent[0].appendChild(newList);
  return res && res.ok && res.json()
 })
 .then((data) => data.forEach(item => listWrapper[0].append(listElement(item))))

}
