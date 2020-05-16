Login = require('../Model/LoginHandler');
const auth = require('../Model/CacheMiddleware');

/**
 * Upsert the Login data
 * @param req
 * @param res
 * @param next
 */
exports.loginfunction = function (req, res, next) {
    const query = req.body.googleId;
    const access_token=req.headers['access_token'];
    Login.findOne({googleId: query}, function (err, data) {
        if (err) console.log(err);
        if (data) {
            console.log("User Already there");
            res.json({
                data:data
            });
            auth.updateToken(access_token,query);
        } else {
            let user = new Login(req.body);
            user.save(function (err, data) {
                if (err) console.log(err);
                console.log("New user created");
                res.json({
                    data: data
                });
                auth.updateToken(access_token,query);
            });
        }
    });

};
