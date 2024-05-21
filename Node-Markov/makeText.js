const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


function generateText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText());
}

function makeText(pat) {
    fs.readFile(path, "utf8", function cb(err,data){
        if(err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        }else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    let resp;

    try{
        resp = await axios.get(url);
    }catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if(method ==="file"){
    makeURLText(path);
}

else {
    console.error(`Unknwn method: ${method}`);
    process.exit(1);
}