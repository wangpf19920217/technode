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
//下载完各种npm以后 如下 创建消息
var messages = [];

io.sockets.on('connection', function (socket) {
  socket.on('getAllMessages', function () {
    socket.emit('allMessages', messages);
  })
  socket.on('createMessage', function (message) {
    messages.push(message);
    io.sockets.emit('messageAdded', message);
  })
});
/*
我们暂时把消息数据放到`messages`这个数组对象中。
用户连上来后，向服务端发送`getAllMessages`请求，获取所有消息，
服务器就把所有的消息通过`allMessages`事件推送给客户端；当用户创建消息时，
向服务端发送`createMessage`事件，服务端把消息存放到`messages`数组中，
并向所有的客户端广播`messageAdded`，有新的消息添加进来。
 */