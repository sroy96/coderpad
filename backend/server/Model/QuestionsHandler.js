const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    document_id: {
        type: String,
        require: true,
    },
    company_name: {
        type: String,
        require: true,
    },
    question_base: {
        type: String,
        require: true,
    },
    question_difficulty: {
        type: String,
        require: true,
    },
    full_question: {
        type: String,
        require: true,
    },
    question_tag: {
        type: Array,

    },
    question_rating: {
        type: Number,
        default: 0
    }
});

const Questions = module.exports = mongoose.model('question', questionSchema, 'questions');

module.exports.get = function (callback, limit) {
    Questions.find(callback).limit(limit);
};
