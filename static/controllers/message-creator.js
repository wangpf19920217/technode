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