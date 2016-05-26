var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/technode');
exports.User = mongoose.model('User', require('./user'));

/**
 * 记得使用`npm install mongoose --save`安装mongoose；
   接下来编写登录验证的逻辑，在TechNode目录下新建controllers文件夹，
   新建user.js文件，为了便于管理代码，我们把与用户相关的业务逻辑都放在controllers/user.js这个文件中；
 */