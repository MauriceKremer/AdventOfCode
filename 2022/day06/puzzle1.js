const fs = require('fs');
const readline = require('readline');

function parseSignal(line) {
  let data = line.split('');

  let prechars = [];
  for (let i = 0 ; i < data.length ; i ++) {
    let letter = data[i];
    if (prechars.length < 4) {
      prechars.push(letter);
    } else {
      prechars.splice(0,1);
      prechars.push(letter);
      let uniquetest = new Set();
      prechars.forEach(element=>{
        uniquetest.add(element);
      });
      if (uniquetest.size==4) {
        console.log(uniquetest);
        return i+1;
      }
    }
  }
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let readStacks = true;
    rl.on('line', (line) => {
      console.log(parseSignal(line));
    });

    await new Promise((res) => rl.once('close', res));
  })();