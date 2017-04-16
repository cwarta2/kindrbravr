var watson = require('watson-developer-cloud');
var util = require('util');
var Twitter = require('twitter');

var tone_analyzer = watson.tone_analyzer({
  username: 'a23f320a-305c-4b5b-8be0-bf865f45a014',
  password: '2gYb8Tzfylzk',
  version: 'v3',
  version_date: '2016-05-19'
});

function getMood(moods) {
  var results = [
    {
      id: "anger",
      value: moods.anger
    },
    {
      id: "disgust",
      value: moods.disgust
    },
    {
      id: "fear",
      value: moods.fear
    },
    {
      id: "joy",
      value: moods.joy
    },
    {
      id: "sadness",
      value: moods.sadness
    }
  ];

  results.sort(function(a, b) {
    return b.value - a.value;
  });
  return results[0].id;
}

var cascadiaWatson = {
  analyzeTweet: function(tweet, callback) {

    tone_analyzer.tone({ text: tweet.text },
      function(err, tone) {
        if (err)
          console.log(err);
        else
          var returnObj = {};
          console.log('tone', tone)
          var tweetTones = tone.document_tone.tone_categories[0].tones;
          for(var i = 0; i < 5; i++) {
            var id = tweetTones[i].tone_id;
            var score = tweetTones[i].score;

            returnObj[id] = tweetTones[i].score;
          }
          tweet.tone = returnObj;
          tweet.mood = getMood(returnObj);
          callback(null, tweet);
    });
  }
}

module.exports = cascadiaWatson;