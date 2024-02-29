let elForm = document.querySelector(".form")
let elInput =document.querySelector(".form-input")
let elList =document.querySelector(".list")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")

let todus =[]
elForm.addEventListener("submit", function(evt){
 evt.preventDefault()
 let data = {
   id:todus.length + 1,
   value:elInput.value,
   isComplate: false
 }
 todus.push(data)
 renderTodo(todus,elList)
 evt.target.reset()
})

// -------renderTodo start --------

function renderTodo(arr,list){
  list.innerHTML = "";
  arr.map(item=>{
    let elItem =document.createElement("li")
    elItem.classList.add("todo-item")
    elItem.innerHTML  = `
    <div class ="value-wrapper ${item.isComplate ? "complate" : ""}">
    <span>${item.id}.</span>
    <strong>${item.value}</strong>
    </div>
    <div class="btn-wrapper">
    <input class ="checkbox-todo" id="${item.id}" type = "checkbox"/>
    <button onclick="updateClick(${item.id})">Update</button>
    <button onclick="deleteClick(${item.id})">Delete</button>
    </div>

    `

    list.appendChild(elItem)
  })
}
// -------renderTodo end --------

// -------update start -------

function updateClick(id){
  elModalWrapper.classList.add("open-modal")
  let data = todus.find(item => item.id === id)

  elModal.innerHTML =`
  <div class="update-wrapper">
  <strong>Update your todo</strong>
  <input value=${data.value} class="update-input" placeholder="Enter your todo"/>
  <button onclick="updateBtnClick(${id})">Update</button>
  </div>
  `
}
function updateBtnClick(id){
  let  elUpdateValue =document.querySelector(".update-input").value
  let data = todus.find(item=>item.id === id)
    data.value= elUpdateValue
    elModalWrapper.classList.remove("open-modal")
    renderTodo(todus,elList) 
}

// -------update end -------

// -------delete start -------

function deleteClick(id){
  elModalWrapper.classList.add("open-modal")
  elModal.innerHTML =`
  <div class="delete-wrapper">
    <h2>Are uoy sure delete</h2>
    <div>
     <button onclick ="cancelModal()">Cancel</button>
     <button onclick ="deleteSureBtn(${id})">Delete</button>
    </div>
  </div>
  `
}
function cancelModal(){
  elModalWrapper.classList.remove("open-modal")
}
function deleteSureBtn(id){
  let data =todus.findIndex(item=>item.id ==id)
  todus.splice(data,1)
  elModalWrapper.classList.remove("open-modal")
  renderTodo(todus,elList)
}
// -------delete end -------

// -------modal start -------
elModalWrapper.addEventListener("click", function(evt){
  if(evt.target.id=="modal-wrapper"){
    elModalWrapper.classList.remove("open-modal")
  }
})

// -------modal end -------

// -------Checkbox start -------
elList.addEventListener("click",function(evt){
  if(evt.target.matches(".checkbox-todo")){
    let data =todus.find(item=>item.id == evt.target.id)
    data.isComplate = !data.isComplate
    renderTodo(todus,elList)
  }
})
// -------Checkbox end -------
