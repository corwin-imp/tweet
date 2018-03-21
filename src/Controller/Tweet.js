var tweetModel = require('../Model/Tweet');
function TweetController(){

}
TweetController.prototype.getTweets = function(count,sort) {
    return tweetModel.getTweets(count,sort);
}

var tweetController = new TweetController();

module.exports = tweetController;