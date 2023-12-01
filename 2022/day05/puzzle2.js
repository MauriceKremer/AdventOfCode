const fs = require('fs');
const readline = require('readline');

const dataStack = {};

function readStackLine(line) {
  let data = line.match(/\s?.{3}/g);

  for (let i = 0 ; i < data.length ; i ++) {
    // if no letter skip to next match
    let letter = data[i].match(/[A-Z]{1}/);
    if (letter==null) continue;

    if (!dataStack.hasOwnProperty(i+1)) dataStack[i+1] = [];
    dataStack[i+1].push(letter[0]);
  }
}

function reverseStacks() {
  for (const i in dataStack) {
    dataStack[i].reverse();
  }
}

function displayTop() {
  for (const i in dataStack) {
    console.log(i,dataStack[i].pop());
  }
}

function processMove(line) {
  let numbers = line.match(/\d{1,3}/g);
  let moves = numbers[0];
  let fromStack = numbers[1];
  let toStack = numbers[2];

  if (dataStack[toStack] == undefined)   dataStack[toStack] = [];
  if (dataStack[fromStack] == undefined) dataStack[fromStack] = [];

  //load from source stack into crane
  let craneLoad = [];
  while (moves > 0 && dataStack[fromStack].length > 0) {
    craneLoad.push(dataStack[fromStack].pop());
    moves --;
  }

  //unload from cran to target stack
  while (craneLoad.length > 0) {
    dataStack[toStack].push(craneLoad.pop());
  }  
 
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let readStacks = true;
    rl.on('line', (line) => {

      if (line == '') {
        readStacks = false;
        reverseStacks();
      } else if (readStacks) {
        readStackLine(line);
      } else {
        processMove(line);
      }

    });

    await new Promise((res) => rl.once('close', res));
    displayTop();

  })();