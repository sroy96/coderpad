const mongoose= require('mongoose');
const HashMap = require('hashmap');

const ratingHandler = new mongoose.Schema({

    google_id:{
        require:true,
        type: String
    },
    document_id:{
        type:String,
    },
    star:{
      type:Number,
    }

});

const Ratings = module.exports= mongoose.model('rating',ratingHandler,'rating');  //creating a mongo module to export and read by the mongo db

module.exports.get= function (callback,limits) {
Ratings.find(callback).limit(limits);
};
