let elForm = document.querySelector(".form")
let elInput =document.querySelector(".form-input")
let elList =document.querySelector(".list")

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

function renderTodo(arr,list){
  list.innerHTML = "";
  arr.map(item=>{
    let elItem =document.createElement("li")
    elItem.classList.add("todo-item")
    elItem.innerHTML  = `
    <div class ="value-wrapper">
    <span>${item.id}.</span>
    <strong>${item.value}</strong>
    </div>
    <div class="btn-wrapper">
    <input type = "checkbox"/>
    <button>Update</button>
    <button>Delete</button>
    </div>

    `

    list.appendChild(elItem)
  })
}