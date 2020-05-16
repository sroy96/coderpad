Ratings = require('../Model/RatingHandler');
const auth = require('../Model/CacheMiddleware');

/**
 * Post Rating for a question
 * @param req
 * @param res
 */
exports.giveRating = function (req, res) {
    const query = req.body.document_id;
    const googleIdval = auth.validateToken(req.headers['access_token']);
    Ratings.findOneAndUpdate({
        google_id: googleIdval,
        document_id: query
    }, {$set: {star: req.body.star}}, {new: true}, (err, doc) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        if (doc) {
            console.log("Already");
            console.log(doc);
            res.send(doc).status("200 OK");
        } else {
            console.log("New Rating");
            let rate = new Ratings();
            rate.google_id = googleIdval;
            rate.star = req.body.star;
            rate.document_id = req.body.document_id;
            rate.save(function (err, data) {
                if (err) console.log(err);
                res.json({
                    data: data
                });
            });
        }
    });
};
