const dotenv = require('dotenv');
const twitter = require('twitter-lite');
dotenv.config();
let lastsend = undefined;
let env = process.env;

const client = new twitter({
    consumer_key: env.consumer_key,  
    consumer_secret: env.consumer_secret,  
    access_token_key: env.access_token_key,  
    access_token_secret: env.access_token_secret  
});

module.exports.sendTweet = (message) => {
    let newdate = new Date();
    let lastdate = lastsend != undefined ? new Date(lastsend) : undefined;
    if(lastsend != undefined || newdate.getDate() == lastdate.getDate()){
        return false;
    }
    
    if(newdate.getHours() != 12){
        return false;
    }

    client.post('statuses/update', { status: message }).then(tweet => {
        console.log("You send the tweet successfully!");
        console.log(tweet.text);
        console.log(new Date());
        console.log(" ");
      }).catch(console.error);
}
