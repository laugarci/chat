const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.broadcast.emit('hi');

	  socket.on('chat message', (msg, username) => {
		  io.emit('chat message', msg, username);
		  console.log(username + 'message: ' + msg);
	});
	socket.on('set username', (username) => {
		socket.username = username;	
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	})
});

io.emit('some event', {
	someProperty: 'some value',
	otherProperty: 'other value'
});

server.listen(3000, () => {  
	console.log('listening on *:3000');
});
