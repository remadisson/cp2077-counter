const dotenv = require("dotenv");
const twitter = require("twitter-lite");
const files = require("./files");
dotenv.config();
let env = process.env;

const client = new twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret,
});

module.exports.sendTweet = (distance, message) => {
  let d = distance[0];
  let unit = distance[1];

  let lastsend = process.env.lastsend;

  let newdate = new Date();

  if(lastsend == "finished"){
      return "Already done! Please shut me down!";
  }

  let lastdate =
    getType(lastsend) !== undefined ? new Date(lastsend) : undefined;

  if (lastdate == undefined ? false : newdate.getDate() == lastdate.getDate()) {
    return (
      "Last send is today. (Last: " +
      lastdate.getDate() +
      " == " +
      newdate.getDate() +
      ")"
    );
  }

  switch (unit.toString().toLowerCase()) {
    case "days": {
      if (newdate.getHours() != 10 && lastdate != undefined) {
        return (
          "Last send is " +
          lastdate.getDate() +
          "/" +
          lastdate.getMonth() +
          "/" +
          lastdate.getFullYear()
        );
      }
      break;
    }

    case "hours": {
        if(newdate.getMinutes() != 10 && newdate.getMinutes() != 20 && newdate.getMinutes() != 30 && newdate.getMinutes() != 40 && newdate.getMinutes() != 50 && newdate.getMinutes() != 60){
            return "Last send is Today on " + lastdate.getHours() + ":" + lastdate.getMinutes() + ":" + lastdate.getSeconds();
        }
        break;
    }

    case "minutes": {
        if(newdate.getMinutes != 5 && newdate.getMinutes != 3 && newdate.getMinutes != 1 && newdate.getMinutes() != 0){
            return "Last send is Today on " + lastdate.getHours() + ":" + lastdate.getMinutes() + ":" + lastdate.getSeconds();
        }

        if(d == 0){
            files.setValue("lastsend", "finished");
            tweet("Cyberpunk 2077 shlould be out now!");
            return "Last Tweet send!"
        }
    }
    break;
  }

    tweet(distance[0] + " " + distance[1] + " " + message);
  files.setValue("lastsend", new Date());
  return "Tweet send!";
};

var getType = function (value) {
  try {
    return new Function("return " + value + ";")();
  } catch (e) {
    return value;
  }
};

function tweet (message){
    client
    .post("statuses/update", {
      status: message,
    })
    .then((tweet) => {
      console.log(tweet.text);
      console.log(" ");
    })
    .catch(console.error);
}
