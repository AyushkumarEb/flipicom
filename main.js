const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require("socket.io")(http)

let count = 0;


app.get("/" , (req, res) => {
res.sendFile(__dirname + "/chat4.html")
});

io.on("connection" , (socket) => {
console.log("a user connected")
count++;
io.emit("usercnt" , count)

socket.on("disconnect" , () => {
console.log("a user disconnected") 
count--;
io.emit("usercnt" , count)
})

socket.on("sendmsg" , (msg, msg2) => {
io.emit("sendmsg" , msg, msg2)
})

})


http.listen(3000);