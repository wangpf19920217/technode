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