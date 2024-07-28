
const express = require("express");
const app = express();
const path = require("path");

// Run on http server
const http = require("http");

const socketio = require("socket.io");
// Build a server
const server = http.createServer(app);
const io = socketio(server);

// Setup ejs
app.set("view engine", "ejs");

// Setup public folder for static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  //fnt-backend
  socket.on("send-location", function(data){
    //bcknd-fntd
    io.emit("receive-location", {id:socket.id, ...data});
  });
  // console.log("connected");
  //used to create real time tracker of the user
  socket.on("disconnect",function(){
    io.emit("user-disconnect", socket.id);
  })
});

app.get("/", function (req, res) {
  res.render("index"); //rendering the index page
});

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});

