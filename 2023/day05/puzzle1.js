const fs = require('fs');
const readline = require('readline');
const { readSeeds, parseLine } = require('./routines5.js');

async function onFile() {

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        parseLine(line);
    });

    await new Promise((res) => rl.once('close', res));
    
    let results = readSeeds();
    const lowest = results.reduce((a, b) => Math.min(a, b))
    console.log(lowest);
} 

void (async () => {
    await onFile();
})();