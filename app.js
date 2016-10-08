var template = `
    <input type="checkbox" class="done"/>
    <span class="text"></span>
`
var add_task_view = function(task){
  var task_view = document.createElement('div')
  task_view.classList.add("task")
  task_view.innerHTML = template

  task_view.getElementsByClassName("text")[0].textContent = task.text
  var done_checkbox = task_view.getElementsByClassName("done")[0] 
  
  done_checkbox.checked = task.done
  done_checkbox.addEventListener("change", function(){
    task.done = done_checkbox.checked
    var done_request = new XMLHttpRequest()

    done_request.open("PATCH", `http://localhost:4321/tasks/${task.id}`)
    done_request.send(JSON.stringify({done: task.done}))
  })

  document.body.appendChild(task_view)
}

var tasks_request = new XMLHttpRequest()

tasks_request.addEventListener("load", function(){
  tasks = JSON.parse(tasks_request.responseText)
  tasks.forEach(function(task){
    add_task_view(task)
  })
})

tasks_request.open("GET", "http://localhost:4321/tasks")
tasks_request.send()

var add_task_button = document.getElementById("add_task_button")
add_task_button.addEventListener("click", function(){
  var task_text = prompt("Do What?")
  var new_task = {text: task_text, done: false}
  add_task_view(new_task)

  var new_task_request = new XMLHttpRequest()
  new_task_request.open("POST", "http://localhost:4321/tasks")
  new_task_request.send(JSON.stringify(new_task))
})
