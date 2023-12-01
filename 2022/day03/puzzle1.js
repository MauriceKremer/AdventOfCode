const fs = require('fs');
const readline = require('readline');

function score(a) {
  let b = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return b.indexOf(a);
}

function dupes(left,right) {
  let leftSet = new Set();
  left.split('').forEach(element => {
    leftSet.add(element);
  });
  let result = new Set();
  right.split('').forEach(element=>{
    if (leftSet.has(element)) {
      result.add(element);
    }
  });
  return Array.from(result);
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let total = 0;
    rl.on('line', (line) => {

      //split in half
      let left = line.substring(0,line.length/2);
      let right = line.substring(line.length/2);
      let dupe = dupes(left,right)[0];
      total += score(dupe);

    });
  
    await new Promise((res) => rl.once('close', res));

    console.log(total);

  })();