var express = require('express')
var bodyParser = require('body-parser')

var server = express()


server.use(bodyParser.text({type: '*/*'}))

server.use(function(request, response, next){
  response.set({"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'})
  next()
})

var tasks = [
    {id: "1", text: "Go Shopping for Boxers", done: false},
    
    {id: "2", text: "Fix Car Noise", done: true},
    
    {id: "3", text: "Get Milk You Scrub", done: false},
    
    {id: "4", text: "Scrub Self", done: false},
    
    {id: "5", text: "Scrub Car", done: false},
    
    {id: "6", text: "Don't be a scrub", done: false}
]

server.get("/tasks", function(request, response){
  response.send(JSON.stringify(tasks))
})

server.patch("/tasks/:id", function(request, response){
  var updated_task = tasks.find(function(task){
   return task.id == request.params.id
  })
  var task_updates = JSON.parse(request.body)
  updated_task.done = task_updates.done
  response.send("Yay!")
})


server.listen(4321)