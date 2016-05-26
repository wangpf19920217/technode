//在`static`目录下新建名为`technode.js`文件，并引入到`index.html`中
angular.module('techNodeApp', []);

//将socket.io封装成了一个名为`socket`的Angular的服务，这样我们就可以在其他组件中使用`socket`与服务端通信了：

angular.module('techNodeApp').factory('socket', function($rootScope) {
  var socket = io.connect('/');
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        })
      })
    }
  }
});
//接下来是定义`RoomCtrl`：

angular.module('techNodeApp').controller('RoomCtrl', function($scope, socket) {
  $scope.messages = [];
  socket.emit('getAllMessages');
  socket.on('allMessage', function (messages) {
    $scope.messages = messages; //$scope.messages = []`是这个控制器的数据模型；对应视图中的  某某{messages}
  })
  socket.on('messageAdded', function (message) {
    $scope.messages.push(message);
    //在techNode启动后，通过socket服务从服务端获取所有消息，更新到数据模型`messages`中。
  })
});
/*
MessageCteatorCtrl的定义也非常简单，当用户按下回车时，将消息通过socket发送给服务端；
注意着了的newMessage是通过ng-model与textarea直接绑定的；
下面是另一个控制器`MessageCteatorCtrl`：
 */
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
});

/*
你一定注意到了视图上有两个奇怪的属性`ctrl-enter-break-line`和`auto-scroll-to-bottom`，这是我们自定义的两个Angular指令：

- autoScrollToBottom：当消息很多出现滚动条时，该组件使得滚动条能随着消息的增加自动滚动到底部；
- ctrlEnterBreakLine: 在textarea回车，默认会换行，使用这个组件，可以通过ctrl+enter来换行，而enter则触发绑定的行为，在这里就是createMessage这个方法。
 */
angular.module('techNodeApp').directive('autoScrollToBottom', function() {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(
        function() {
          return element.children().length;
        },
        function() {
          element.animate({
            scrollTop: element.prop('scrollHeight')
          }, 1000);
        }
      );
    }
  };
});

angular.module('techNodeApp').directive('ctrlEnterBreakLine', function() {
  return function(scope, element, attrs) {
    var ctrlDown = false;
    element.bind("keydown", function(evt) {
      if (evt.which === 17) {
        ctrlDown = true;
        setTimeout(function() {
          ctrlDown = false;
        }, 1000)
      }
      if (evt.which === 13) {
        if (ctrlDown) {
          element.val(element.val() + '\n')
        } else {
          scope.$apply(function() {
            scope.$eval(attrs.ctrlEnterBreakLine);
          });
          evt.preventDefault();
        }
      }
    });
  };
});