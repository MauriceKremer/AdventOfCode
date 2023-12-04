const fs = require('fs');
const readline = require('readline');
const { prizeCheck } = require('./routines.js');

async function onFile() {

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    sum = 0;
    rl.on('line', (line) => {
        sum += prizeCheck(line);
    });

    await new Promise((res) => rl.once('close', res));
    console.log(sum);

} 

void (async () => {
    await onFile();
})();