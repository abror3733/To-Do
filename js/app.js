let elForm = document.querySelector(".form")
let elInput =document.querySelector(".form-input")
let elList =document.querySelector(".list")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")


let elCount =document.querySelector(".all-count")
let elCompletedCount =document.querySelector(".completed-count")
let elUncompletedCount =document.querySelector(".uncompleted-count")

let todus =JSON.parse(window.localStorage.getItem("todus")) || []
elForm.addEventListener("submit", function(evt){
 evt.preventDefault()
 if(evt.target[0].value .trim() != ""){
  let data = {
    id:todus.length + 1,
    value:elInput.value,
    isComplate: false
  }
  todus.push(data)
  renderTodo(todus,elList)
  evt.target.reset()
  window.localStorage.setItem("todus",JSON.stringify(todus))

 }
 else{
  alert("Place Inputni to'ldiring  ")
 }

})


// window.localStorage.setItem("todus",JSON.stringify(todus))
renderTodo(todus,elList)


// -------renderTodo start --------

function renderTodo(arr,list){
  list.innerHTML = "";
  
  arr.map((item,index)=>{
    let elItem =document.createElement("li")
    elItem.classList.add("todo-item")
    elItem.innerHTML  = `
    <div class ="value-wrapper ${item.isComplate ? "complate" : ""}">
    <span>${index + 1}.</span>
    <strong>${item.value}</strong>
    </div>
    <div class="btn-wrapper">
      <label>
      <input class ="checkbox-todo visually-hidden" id="${item.id}" type = "checkbox"/>
      <div class="check-wrapper">
        <span class=${item.isComplate ? "check-open" : "check-inner"}></span>
      </div>
      </label>
    <button onclick="updateClick(${item.id})">Update</button>
    <button onclick="deleteClick(${item.id})">Delete</button>
    </div>

    `

    list.appendChild(elItem)
  })

  elCount.textContent = todus.length
  elCompletedCount.textContent=todus.filter(item=>item.isComplate==true).length
  elUncompletedCount.textContent=todus.filter(item=>item.isComplate==false).length

}


elCount.parentElement.addEventListener("click",function(){
  renderTodo(todus,elList)
})
elCompletedCount.parentElement.addEventListener("click", function(){
let data = todus.filter(item=>item.isComplate==true)
renderTodo(data,elList)
})
elUncompletedCount.parentElement.addEventListener("click", function(){
  let data = todus.filter(item=>item.isComplate==false)
  renderTodo(data,elList)
  })

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
    window.localStorage.setItem("todus",JSON.stringify(todus))
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
  window.localStorage.setItem("todus",JSON.stringify(todus))

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
    window.localStorage.setItem("todus",JSON.stringify(todus))

  }
})
// -------Checkbox end -------
