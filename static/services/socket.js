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