var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'testing'
});
instance.compile();//2.0.6 版本开始内置了自动编译的功能，无需再执行该命令，直接启动服务即可。
instance.run();