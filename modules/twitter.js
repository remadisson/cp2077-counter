const dotenv = require('dotenv');
const twitter = require('twitter-lite');
const files = require('./files');
dotenv.config();
let env = process.env;


const client = new twitter({
    consumer_key: env.consumer_key,  
    consumer_secret: env.consumer_secret,  
    access_token_key: env.access_token_key,  
    access_token_secret: env.access_token_secret  
});

module.exports.sendTweet = (message) => {
    let lastsend = process.env.lastsend;
    
    let newdate = new Date();
    let lastdate = getType(lastsend) !== undefined ? new Date(lastsend) : undefined;
    
    if(lastdate == undefined ? false : (newdate.getDate() == lastdate.getDate())){
        return "Last send is today. (Last: " + lastdate.getDate() + " == " + newdate.getDate() + ")";
    }

    if(newdate.getHours() != 10 && lastdate != undefined){
        return "Last send is " + lastdate.getDate() + "/" + lastdate.getMonth() + "/" + lastdate.getFullYear();
    }

    client.post('statuses/update', { status: message }).then(tweet => {
        console.log(tweet.text);
        console.log(" ");
      }).catch(console.error);

    files.setValue('lastsend', new Date());
    return "Tweet send!";
}

var getType = function (value){
    try {
        return (new Function("return " + value + ";"))();
    } catch(e) {
        return value;
    }
};
