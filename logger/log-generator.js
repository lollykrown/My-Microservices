#! /usr/bin/env node

const fs = require("fs")
var path = require("path")

var data = fs.readFileSync(path.join(__dirname, "./sample-source.log"), "utf8")
const sourceLogs = data.split("\n")

var index = 0
var count = 0
// Initialize log file
fs.writeFileSync(path.join(__dirname, "./sample.log"), sourceLogs[index++], "utf8");

setInterval(() => {
    if (count === 50) { // This simulates log rotation
        count = 0
        if (index === sourceLogs.length) {
            index = 0 // start at the beginning of the file
        }
        fs.writeFileSync(path.join(__dirname, "./sample.log"), sourceLogs[index++], "utf8");
        return
    }
    const logs = fs.readFileSync(path.join(__dirname, "./sample.log"), "utf8");
    if (index === sourceLogs.length) {
        index = 0 // start at the beginning of the file
    }
    fs.writeFileSync(path.join(__dirname, "./sample.log"), logs + "\n" + sourceLogs[index++], "utf8");
    count++
}, 2000);

