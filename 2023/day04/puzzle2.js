const fs = require('fs');
const readline = require('readline');
const { prizeCheck2, reset } = require('./routines.js');

async function onFile() {

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    sum = 0;
    rl.on('line', (line) => {
        sum = prizeCheck2(line);
    });

    await new Promise((res) => rl.once('close', res));
    console.log(sum);

} 

void (async () => {
    reset();
    await onFile();
})();