var test_1 = {
  text:
    'Creating a Grocery List Manager Using Angular, Part 1: Add &amp; Display Items https://t.co/xFox78juL1 #Angular',
  user: {
    name: 'SitePoint JavaScript',
    followers_count: 215,
  },
};

var test_2 = {
  text:
    'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
  user: {
    name: 'SitePoint',
    followers_count: 145,
  },
};
var test_3 = {
  text:
    'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
  user: {
    name: 'JavaScript',
    followers_count: 45,
  },
};
var test_4 = {
  text:
    'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  user: {
    name: 'Script',
    followers_count: 25,
  },
};
var test_5 = {
  text: ' officia deserunt mollit anim id est laborum.',
  user: {
    name: 'Scr',
    followers_count: 10,
  },
};
function followAsc(a, b) {
  return a.user.followers_count - b.user.followers_count;
}
function followDesc(a, b) {
  return b.user.followers_count - a.user.followers_count;
}
var tweets = [test_1, test_2, test_3, test_4, test_5];

function TweetModel(tweets) {
  this.tweets = tweets;
}
TweetModel.prototype.getTweets = function(count, sort) {
  var items = [];

  if (sort) {
    if (sort == 'asc') {
      var tweets = this.tweets;
      tweets.sort(followAsc);
      for (var x = 0; x < 10; x++) {
        var l = x;
        if (x > 4) {
          l = 4;
        }
        items.push({
          name: tweets[l].user.name + ' ' + count,
          text: tweets[l].text,
          followers_count: tweets[l].user.followers_count,
        });
      }
    } else {
      var tweets = this.tweets;
      tweets.sort(followDesc);
      for (var x = 0; x < 10; x++) {
        var l = x;
        if (x > 4) {
          l = 4;
        }
        items.push({
          name: tweets[l].user.name + ' ' + count,
          text: tweets[l].text,
          followers_count: tweets[l].user.followers_count,
        });
      }
    }
  } else {
    for (var x = 0; x < 10; x++) {
      var tweetNumber = Math.ceil(Math.random() * 4);
      var tweetRand = this.tweets[tweetNumber];
      items.push({
        name: tweetRand.user.name + ' ' + count,
        text: tweetRand.text,
        followers_count: tweetRand.user.followers_count,
      });
    }
  }

  return items;
};
var tweetModel = new TweetModel(tweets);

module.exports = tweetModel;
