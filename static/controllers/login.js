angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location) {
  $scope.login = function () {
    $http({
      url: '/api/login',
      method: 'POST',
      data: {
        email: $scope.email
      }
    }).success(function (user) {
      $scope.$emit('login', user);
      $location.path('/'); 
      //$http 相当于$ajax 请求回来判断是留在当前页  如果错误则让用户登陆
    }).error(function (data) {
      $location.path('/login');
    })
  }
});
