


User= require('../Model/User.js');
UserProfile=require('../Model/UserProfile.js');
/*

get all user details
 */
exports.index= function (req,res) {
User.get(function (err,users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status:"success",
            message:"All User Details ",
            data:users
        });
});
};
/*
POST
 */
exports.new = function (req,res) {
    //create Object of User
    const user= new User();
    user.accessTokens =  req.body.accessTokens ? req.body.accessTokens : user.accessTokens;
    user.tokenId = req.body.tokenId ;
    user.profile = req.body.profile ;

   user.save(function (err) {
            if(err){
                res.json(err);
            }
            res.json({
                message : "New User Saved",
                data: user
            });
   });
};

/*
findById
 */
exports.view=function(req,res){
    User.findById(req.params.accessTokens,function (err,user) {
            if(err) {
                res.send(err);
            }
            res.json({
                message:"User Data Loading..",
                data:user
            });
    });
};
/*
PUT/PATCH
 */
exports.update=function (res,req) {
    User.findById(req.params.accessTokens,function (err,user) {
       if(err) {
                res.send(err);
            }
        user.accessTokens =  req.body.accessTokens ? req.body.accessTokens : user.accessTokens;
        user.tokenId = req.body.tokenId ;
        user.profile = req.body.profile ;
        user.save(function (err) {
           if(err)
               res.send(err);


        res.json({
           message:"User Info Updated",
        });
    });
});
};
