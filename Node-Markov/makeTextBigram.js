const fs = require('fs');
const markov = require("./bigram");
const axios = require("axios");
const process = require("process");

function generatetext(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", function cd(err, data){
    if (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
    }else {
        generatetext(data);
    }
    });

}

async function makeURLText(url) {
    let Response;

    try {
        resp = await axios.get(url);
    }catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generatetext(resp.data)
}

let [method, path] = process.argv.slice(2);

if(method ==="file") {
    makeText(path);
}
else if (method ==="url"){
    makeURLText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}