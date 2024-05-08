const fs = require('fs');
const readline = require('readline');

function partialOverlap(rangeText1,rangeText2) {
  
  let min1 = Number(rangeText1.split('-')[0]);
  let max1 = Number(rangeText1.split('-')[1]);
  let min2 = Number(rangeText2.split('-')[0]);
  let max2 = Number(rangeText2.split('-')[1]);
  return (
      (min1 >= min2 && min1 <= max2) ||
      (max1 >= min2 && max1 <= max2) ||
      (min2 >= min1 && min2 <= max1) ||
      (max2 >= min1 && max2 <= max1)
    );
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let total = 0;
    rl.on('line', (line) => {

      if (partialOverlap(line.split(',')[0],line.split(',')[1])){
        total+=1;
      }

    });

    await new Promise((res) => rl.once('close', res));
    console.log(total);

  })();