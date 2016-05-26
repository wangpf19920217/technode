var express = require('express');
var bodyParder = require('body-parser');
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

/*
在TechNode目录下新建controllers文件夹
提供了两个接口，一是通过用户ID查找用户；二是通过邮箱地址查找用户
exports.findUserById 
exports.findByEmailOrCreate
最后在app.js中将登录验证的接口暴露出来：
 */
var Controllers = require('./controllers');

app.use(express.bodyParser());  // parser解析
app.use(express.cookieParser());
app.use(express.session({
  secret: 'technode',
  cookie:{
    maxAge: 60 * 1000   //存贮周期
  }
}));


app.get('/api/validate', function (req, res) {
  _userId = req.session._userId;
  if (_userId) {
    Controllers.User.findUserById(_userId, function (err, user) {
      if (err) {
        res.json(401, {msg: err});
      } else {
        res.json(user);
      }
    })
  } else {
    res.json(401, null);
  }
})

app.post('/api/login', function (req, res) {
  email = req.body.email;
  if (email) {      
    Controllers.User.findByEmailOrCreate(email, function(err, user) {
      if (err) {
        res.json(500, {msg: err})
      } else {
        req.session._userId = user._id
        res.json(user)
      }
    })
  } else {
    res.json(403)
  }
})

app.get('/api/logout', function (req, res) {
  req.session._userId = null;
  res.json(401);
});
/*
我们使用express提供的session模块来管理用户的认证，整个认证过程如下：
- 客户端调用`api/validate`验证用户是否登录，服务端查看在会话（session）中是否包含用户ID，如果是则表示用户已经登录了，从数据库将用户信息读出来；发给客户端；
- 如果会话中没有用户ID，即用户未登录，客户端调转到登录页面，则通过`api/login`接口登录，服务端根根据用户填写的邮箱地址到数据库中查找用户，如果查找不到就创建一个新用户，然后把用户ID保存在session中，返回用户信息给客户端，登录成功；
- 还提供了一个`api/logout`接口，清除会话中的用户ID，用户成功登出；

 */

//至此服务端的登录验证已经完成，接下来给客户端加上登录验证的功能。