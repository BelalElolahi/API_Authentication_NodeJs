const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {
        type:String ,
    },
    description:  {
        type:String ,
    },
    date : {
        type:Date,
        default : Date.now
    }
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel