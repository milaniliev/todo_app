var express = require('express')
var bodyParser = require('body-parser')
var r  = require('rethinkdb')
var server = express()

var rethinkdb_connection

server.use(bodyParser.text({type: '*/*'}))

server.use(function(request, response, next){
  response.set({"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'})
  next()
})

server.get("/tasks", function(request, response){
  r.table('tasks').run(rethinkdb_connection, function(error, results){
    results.toArray(function(error, tasks){
      response.send(JSON.stringify(tasks))
    })
  })
  
})

server.patch("/tasks/:id", function(request, response){
  var task_updates = JSON.parse(request.body)
  r.table('tasks').get(request.params.id).update({done: task_updates.done}).run(rethinkdb_connection, function(error, results){
    response.send("Yay!")
  })
})

server.post("/tasks", function(request, response){
  var new_task = JSON.parse(request.body)
  r.table('tasks').insert(new_task).run(rethinkdb_connection, function(error, results){
    response.send("Yay!")
  })
})

r.connect({host: 'localhost'}, function(error, connection) {
  server.listen(4321)
  if(error){ throw error} 
  rethinkdb_connection = connection
})

