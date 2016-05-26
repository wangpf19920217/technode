var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var User = new Schema({
//     email:string,
//     name:string,
//     avatarUrl:string
// });
module.exports = User;
var User = new Schema({
  email: String,
  name: String,
  avatarUrl: String
})
//;avatarUrl这个字段是根据用户给的邮箱地址计算出来的avatar头像地址；

module.exports = User;