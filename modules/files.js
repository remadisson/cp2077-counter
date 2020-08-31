const fs = require('fs');
const {parse, stringify} = require('envfile');
const sourcePath = fs.readFileSync('./.env');
let parsedFile = parse(sourcePath);

module.exports.setValue = (key, value) => {
    parsedFile[key] = value;
    process.env[key] = value;
    fs.writeFileSync('./.env', stringify(parsedFile))
}
