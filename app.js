
const express = require("express"); //1
const app = express();//1

const path = require("path"); //4

// socket.io run on http server //2
const http = require("http"); 
const socketio = require("socket.io");
// server to run http server //2
const server = http.createServer(app);
const io = socketio(server); //callback

// Setup ejs //3
app.set("view engine", "ejs");
// Setup public folder for static files //3
app.use(express.static(path.join(__dirname, "public")));


//handle socket connection //4
io.on("connection", function (socket) {
  //to accpet location on backend from frntd
  socket.on("send-location", function(data){
    //bcknd-fntd
    io.emit("receive-location", {id:socket.id, ...data});
  });
  //used to create real time tracker of the user
  socket.on("disconnect",function(){
    io.emit("user-disconnect", socket.id);
  })
});


//To handle GET requests to your server
app.get("/", function (req, res) { //1
  res.render("index"); //rendering the index page
});

server.listen(3000, function () { //1
  console.log("Server is running on port 3000");
});

