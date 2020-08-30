const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');

const scheduler = require('node-schedule');

const twitter = require('./modules/twitter');

app.use(cors());
app.use(express.json());

function getDifference(){
    let finish = new Date("2020-11-19");
    console.log(finish);
    let now = new Date();
    
    console.log(now);

    var days = Math.round((finish.getTime() - now.getTime()) / (1000 * 3600 * 24));
    var hours = days / 24;
    var minutes = hours / 60;

    if(days > 0){
        return days + " Days";
    } else if(hours > 0){
        return hours + " Hours";
    } else if(minutes > 0){
        return minutes + " Minutes";
    } else {
        return false;
    }
}

twitter.sendTweet('This is a tweet to test the Twitter-API! :)');

var job = scheduler.scheduleJob('43 * * * *', () => {
    console.log("Thicc cock!");
});


let listener = app.listen(5000, () => {
    console.log(chalk.cyan("> Listening on port: " + listener.address().port));
});