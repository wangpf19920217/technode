//cationProvider.html5Mode(true)`采用HTML5的pushState来实现路由；
//下一步把room组件对应的视图从index.html拆出来放到room.html中，供angular调用。
//在`static`目录下新建pages目录，添加room.html文件：

angular.module('techNodeApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/', {
    templateUrl: '/pages/room.html',
    controller: 'RoomCtrl'
  }).
  when('/login', {
    templateUrl: '/pages/login.html',
    controller: 'LoginCtrl'
  }).
  otherwise({
    redirectTo: '/login'
  })
});