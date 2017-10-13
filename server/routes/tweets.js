var express = require('express');
var router = express.Router();
var Twit = require('twit');

var config = require('../config/tweetconfig');

// instantiate Twit module
var twitter = new Twit(config.twitter); //loading the access keys and consumer keys 
const logger = require('../services/app.logger'); //logger

var TWEET_COUNT = 25; //setting the numer of tweets to show
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed'; //setting the urls from the api to acess the required tweets
var USER_TIMELINE_URL = 'statuses/user_timeline';
/**
 * GET tweets json.
 */
router.get('/user_timeline/:user', function(req, res) {

    var oembedTweets = [],
        tweets = [],
        params = {
            screen_name: req.params.user, // the user id passed in as part of the route
            count: TWEET_COUNT, // how many tweets to return
        };

    // the max_id is passed in via a query string param
    if (req.query.max_id) {
        params.max_id = req.query.max_id;
    }

    // request data 
    twitter.get(USER_TIMELINE_URL, params, function(err, data, resp) {
        tweets = data;
        var i = 0,
            len = tweets.length;
        for (i; i < len; i++) {
            getOEmbed(tweets[i]);
        }
    });

    /**
     * requests the oEmbed html
     */
    function getOEmbed(tweet) {

        // oEmbed request params,helps in setting the data fields of the tweets
        var params = {
            "id": tweet.id_str, //twitter handle selection
            "maxwidth": MAX_WIDTH, //The maximum width of a rendered Tweet in whole pixels.
            "hide_thread": true //When set to true , t, or 1 a collapsed version of the previous Tweet in a conversation thread will not be displayed when the requested Tweet is in reply to another Tweet

        };

        // request data 
        twitter.post(OEMBED_URL, params, function(err, data, resp) {
            tweet.filter = data;
            oembedTweets.push(tweet);
            logger.info("twitter data")

            // do we have oEmbed HTML for all Tweets?
            if (oembedTweets.length == tweets.length) {
                res.setHeader('Content-Type', 'application/json');
                res.send(oembedTweets);

            }
        });
    }
});

module.exports = router;