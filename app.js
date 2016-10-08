var template = `
    <input type="checkbox" class="done"/>
    <span class="text">Go Shopping for Boxers</span>
`

var fake_data = [
    {text: "Go Shopping for Boxers", done: false},
    
    {text: "Fix Car Noise", done: true},
    
    {text: "Get Milk You Scrub", done: false},
    
    {text: "Scrub Self", done: false},
    
    {text: "Scrub Car", done: false},
    
    {text: "Don't be a scrub", done: false}
]

fake_data.forEach(function(task){
  var task_view = document.createElement('div')
  task_view.classList.add("task")
  task_view.innerHTML = template
  document.body.appendChild(task_view)
})