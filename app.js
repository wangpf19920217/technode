var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

app.use(function (req, res) {
  res.sendfile('./static/index.html');
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  socket.emit('connected');
})

console.log('TechNode is on port ' + port + '!');
/*
与通常的express.js项目一样，我们将静态文件放在`static`目录下；
在`static`目录下还会放`index.html`文件，它将会作为整个应用的启动页面。
除了静态文件的请求以外，其他所有的HTTP请求，
我们都会输出`index.html`文件，服务端不关心路由，
所有的路由逻辑都交给在浏览器端的Angular.js去处理。
 */