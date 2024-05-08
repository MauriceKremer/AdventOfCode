const fs = require('fs');
const readline = require('readline');

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let elf = 0;
    let elfs = [];
    rl.on('line', (line) => {
       if (line == '') {
        elfs.push(elf);
        console.log('Elf ' + elfs.length + ' caries ' + elf);
        elf = 0;
       } else {
        elf += parseInt(line);
       }
    });
  
    await new Promise((res) => rl.once('close', res));

    elfs.sort((a,b) => {return b-a;});
    console.log(elfs[0] + elfs[1] + elfs[2]);

  })();