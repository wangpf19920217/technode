//在`static`目录下新建名为`technode.js`文件，并引入到`index.html`中
angular.module('techNodeApp',['ngRoute']);



/*
MessageCteatorCtrl的定义也非常简单，当用户按下回车时，将消息通过socket发送给服务端；
注意着了的newMessage是通过ng-model与textarea直接绑定的；
下面是另一个控制器`MessageCteatorCtrl`：
 */
//Angular提供了一个名为`Run Block`的启动模块，即当整个应用启动时第一个执行的块。于是我们把登录验证逻辑写在这里：
angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
  $scope.newMessage = '';
  $scope.createMessage = function () {
    if ($scope.newMessage == '') {
      return;
    }
    socket.emit('createMessage', $scope.newMessage)
    $scope.newMessage = '';
    /*   数据模型`$scope.newMessage = ''`与视图中的`
        <textarea ng-model="newMessage" ctrl-enter-break-line="createMessage()"></textarea>`绑定。
    同时绑定了一个控制器方法`createMessage`，当用户回车时，调用这个方法，把新消息发送给服务端。 */
  }
}).run(function ($window, $rootScope, $http, $location) {
  $http({
    url: '/api/validate',
    method: 'GET'
  }).success(function (user) {
    $rootScope.me = user;
    $location.path('/')
  }).error(function (data) {
    $location.path('/login')
  })
});
//`$http`是Angular提供的一个Ajax组件，在应用启动时，通过Ajax调用服务端的验证接口`'/api/validate'`，获取用户的信息，
//如果用户已登录，服务端返回用户信息，客户端把用户信息保存到全局作用域中`$rootScope.me`中，
//然后通过`$location`组件跳转到`/`，即聊天室页面；如果用户未登录，则跳转到登录页。


/*
 run执行完判断是否是登陆状态后 /////
登录验证API 
我们使用MongoDB来存储用户信息，借助`mongoose`操作数据库。
首先定义用于存储用户信息的Schema——User。在TechNode目录下新建models文件夹，加入user.js和index.js文件。

 */




