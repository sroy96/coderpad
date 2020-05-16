const mongoose = require('mongoose');


/*
User DAO  {@link-> userSchema}
 */
const loginSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    // },
    googleId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    loginDate:{
        type:Date,
        _default:Date.now(),
    }

});
const Login = module.exports = mongoose.model('login', loginSchema, 'loginData');

module.exports.get = function (callback, limit) {
    Login.find(callback).limit(limit);
};
