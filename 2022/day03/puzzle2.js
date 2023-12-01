const fs = require('fs');
const readline = require('readline');

function score(a) {
  let b = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return b.indexOf(a);
}

function dupes(left,right) {
  let leftSet = new Set();
  left.forEach(element => {
    leftSet.add(element);
  });
  let result = new Set();
  right.forEach(element=>{
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
    let lineNum = 0;
    let lineText = [];
    rl.on('line', (line) => {

      lineNum += 1
      lineText.push(line.split(''));
      if (lineNum == 3) {
        lineNum = 0;
        let shareChar = dupes(dupes(lineText[0],lineText[1]),lineText[2]);
        lineText = [];
        total += score(shareChar[0]);

      }

    });
  
    await new Promise((res) => rl.once('close', res));

    console.log(total);

  })();