const fs = require('fs');
const readline = require('readline');

const scorecard = [
    {opponent:"A",counter:"X",score:3}, // rock rock
    {opponent:"A",counter:"Y",score:6}, // rock paper
    {opponent:"A",counter:"Z",score:0}, // rock scissors
    {opponent:"B",counter:"X",score:0}, // paper rock
    {opponent:"B",counter:"Y",score:3}, // paper paper
    {opponent:"B",counter:"Z",score:6}, // paper scissors
    {opponent:"C",counter:"X",score:6}, // scissors rock
    {opponent:"C",counter:"Y",score:0}, // scissors paper
    {opponent:"C",counter:"Z",score:3}  // scissors scissors
];

const valueCounter = {
    X:1,
    Y:2,
    Z:3
};

function play (opponent,counter)  {
    const scenario = scorecard.filter((value)=>{
        return (value.opponent == opponent && value.counter == counter);
    });
    const counterScore = valueCounter[counter];
    return counterScore + scenario[0].score;
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let totalScore = 0;
    rl.on('line', (line) => {
        const game = line.split(' ');
        totalScore += play(game[0],game[1]);
    });
  
    await new Promise((res) => rl.once('close', res));

    console.log(totalScore);

  })();