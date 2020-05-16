Questions = require('../Model/QuestionsHandler');
const UsernameGenerator = require('username-generator');
const ObjectID = require("mongoose").ObjectId;
Ratings = require('../Model/RatingHandler');
const auth = require('../Model/CacheMiddleware');
/**
 * Get all question aggregated from Rating DB.
 * @param req
 * @param res
 */
exports.allques = async function (req, res) {
    //return all questions
    const findQuestions = () => {
        return Questions.find({}).exec();
    };
    //findratings available for current user
    const findRatings = (googleId) => {
        return Ratings.find({'google_id': googleId}).exec();
    };
    const questions = await findQuestions();
    const ratings = await findRatings(auth.validateToken(req.headers['access_token']));
    //create map of question id and ratings
        let ratingsMap = ratings.reduce(function (map, obj) {
            map[obj.document_id] = obj.star; //if obj.star === undefined set obj.star=0
            return map;
        }, {});
        //set the map to question_rating
        questions.forEach(value => {
            value.question_rating = ratingsMap[value.document_id];
        });

    await res.json({
        data: questions
    });
};

/**
 * POST QUESTION
 * @param res
 * @param req
 */
exports.postques = function (res, req) {
    const ques = new Questions();
    ques.document_id = UsernameGenerator.generateUsername(":");
    ques.company_name = req.body.company_name;
    ques.question_base = req.body.question_base;
    ques.question_difficulty = req.body.question_difficulty;
    ques.full_question = req.body.full_question;
    ques.question_tag = req.body.question_tag;

    ques.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            status: "200 Ok",
            message: "Question Posted",
            data: ques
        });
    });
};

/**
 * FIND BY DIFFICULTY
 * @param req
 * @param res
 */
exports.tag = function (req, res) {
    Questions.findOne({question_difficulty: req.params.question_difficulty}, function (err, ques) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "200 OK",
            message: "Question Data Loading..",
            data: ques
        });
    });
};

/**
 * Find  by  question Id
 * @param req
 * @param res
 */
exports.quest = function (req, res) {

    Questions.find({document_id: req.params.document_id}, function (err, quesdata) {
        if (err) {
            res.send(err);
        }
        res.send(quesdata[0]);
    });
};

/**
 * Document_id = question ID
 * Find and Update the Question based on Question ID
 * @param res
 * @param req
 */
exports.quesupdate = function (res, req) {
    Questions.findById(req.params.document_id, function (err, ques) {
        if (err) {
            res.send(err);
        }
        ques.document_id = req.body.document_id ? req.body.document_id : ques.document_id;
        ques.company_name = req.body.company_name;
        ques.question_base = req.body.question_base;
        ques.question_difficulty = req.body.question_difficulty;
        ques.full_question = req.body.full_question;
        ques.question_tag = req.body.question_tag;
        ques.save(function (err) {
            if (err)
                res.send(err);


            res.json({
                status: "200 OK",
                message: "Question Info Updated",
            });
        });
    });
};
