$(function(){
    var tweets;
    function getMood() {
        $.get("/getmood", function(data) {
           $("#twitterMood").attr("src", "img/" + data['mood'] + ".svg");
           $("#moodTitle").text(data["mood"]);
           tweets = data["results"];

           var results = '';
            tweets.map(function(tweet){
                results += twitterCard(tweet.text, tweet.user, tweet.avatar, tweet.mood);
            });
            $("#tweetdeck").html(results);
        });
    }

    getMood();
    setInterval(function() {
      getMood();
    }, 10000);

    function twitterCard(tweet, tweeter, avatar, mood) {
        var tweetTemplate = "<img src=\"img/" + mood + ".svg\" class=\"twitter-mood\" ><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"media\">"
            + "<div class=\"media-left\"><a href=\"#\"><img class=\"media-object img-thumbnail\" src=\"" + avatar + "\" ></a></div>"
            + "<div class=\"media-body\"> <h4 class=\"media-heading\"><a href=\"http://twitter.com/"+ tweeter + "\">" + tweeter + "</a></h4>"
            + "<p class=\"lead\"> "+ tweet +"</p>"
            + "</div></div></div></div>";
        return tweetTemplate;
    }
});