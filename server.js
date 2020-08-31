const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();
const scheduler = require('node-schedule');

const twitter = require('./modules/twitter');
const files = require('./modules/files');

app.use(cors());
app.use(express.json());

let lastconsole = undefined;

function getDifference(){
    let finish = new Date("2020-11-19");
    let now = new Date();

    var days = Math.ceil((finish.getTime() - now.getTime()) / (1000 * 3600 * 24));
    var hours = days / 24;
    var minutes = hours / 60;

    if(days > 0){
        return [days, "Days"];
    } else if(hours > 0){
        return [hours, "Hours"];
    } else if(minutes > 0){
        return [minutes, "Minutes"];
    } else {
        return false;
    }
}

var job = scheduler.scheduleJob('*/1 * * * *', () => {
    if(!getDifference()){
        return;
    }

    let log = twitter.sendTweet(getDifference(), "until Cyberpunk 2077 release!");

    if(lastconsole == undefined || lastconsole !== log){
        lastconsole = log;
        console.log(chalk.blue(new Date().getHours() +":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "> " +log));
    }
    
});


let listener = app.listen(5000, () => {
    console.log(chalk.cyan(new Date().getHours() +":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "> Listening on port: " + listener.address().port));
});
