const twitter = require('twitter');
const dotenv = require('dotenv');
dotenv.config();

let client = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    bearer_token: process.env.bearer_token,
    //access_token_key: process.env.access_token_key,
    //access_token_secret: process.env.access_token_secret,
});

module.exports.sendTweet = async(message) => {
    await client.post('statuses/update', {status: message}).then((tweet) =>{
        console.log("Tweet has been send!");
        console.log(tweet);
        console.log(new Date());
        console.log(" ");
    }).catch((error) => {
        console.log(error);
    });
}