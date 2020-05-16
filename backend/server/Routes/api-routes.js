let router = require('express').Router();
const auth= require('../Model/CacheMiddleware');
const cors = require('cors');
//ALL Controller Imports
const userController = require('../Controller/UserController.js');
const loginController = require('../Controller/LoginController');
const questionsControlller = require('../Controller/QuestionsController');
const ratingController = require('../Controller/RatingsController');
router.get('/get', cors(), function (req, res) {
    console.log(req.body);
    res.json({
        status: '200 OK',
        message: 'Welcome to Coderpad'

    });
});

//Login API Routes
router.post('/login',loginController.loginfunction);
//router.put('/login',loginController.logins);
//Questions and Rating API Routes
router.get('/questions',auth.validate,questionsControlller.allques);
router.post('/new/question',auth.validate,questionsControlller.postques);
router.get('/select/:question_difficulty',auth.validate,questionsControlller.tag);
router.get('/question/:document_id',auth.validate,questionsControlller.quest);
router.put('/edit/:document_id',auth.validate,questionsControlller.quesupdate);
router.post('/question/rate',auth.validate,ratingController.giveRating);

module.exports = router;
