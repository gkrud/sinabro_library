const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    id: String,
    pw: String,
});

User.statics.create = function(username,id, pw) {
    const user = new this({
        username,
        id,
        pw
    });
    return user.save();
}

User.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec();
}

User.methods.verify = function(pw) {
    return this.pw === pw;
}

module.exports = mongoose.model('User', User);