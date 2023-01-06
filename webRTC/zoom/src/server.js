import http from "http"
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));


const httpServer = http.createServer(app)
// http://localhost:3000/socket.io/socket.io.js
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (msg, done) => console.log(msg));
})


const handleListen = () => console.log('Listening on http://localhost:3000')
httpServer.listen(3000, handleListen)