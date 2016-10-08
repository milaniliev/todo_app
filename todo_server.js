var express = require('express')

var server = express()

var tasks = [
    {text: "Go Shopping for Boxers", done: false},
    
    {text: "Fix Car Noise", done: true},
    
    {text: "Get Milk You Scrub", done: false},
    
    {text: "Scrub Self", done: false},
    
    {text: "Scrub Car", done: false},
    
    {text: "Don't be a scrub", done: false}
]

server.get("/tasks", function(request, response){
  response.set({"Access-Control-Allow-Origin": "*"})
  response.send(JSON.stringify(tasks))
})


server.listen(4321)