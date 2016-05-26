
/*你一定注意到了视图上有两个奇怪的属性`ctrl-enter-break-line`和`auto-scroll-to-bottom`，这是我们自定义的两个Angular指令：

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