const fs = require('fs');
const readline = require('readline');

const scorecard = [
    {opponent:"A",goal:"Z",counter:"B",score:6}, // rock win
    {opponent:"A",goal:"X",counter:"C",score:0}, // rock loose
    {opponent:"A",goal:"Y",counter:"A",score:3}, // rock draw
    {opponent:"B",goal:"Z",counter:"C",score:6}, // paper win
    {opponent:"B",goal:"X",counter:"A",score:0}, // paper loose
    {opponent:"B",goal:"Y",counter:"B",score:3}, // paper draw
    {opponent:"C",goal:"Z",counter:"A",score:6}, // scissors win
    {opponent:"C",goal:"X",counter:"B",score:0}, // scissors loose
    {opponent:"C",goal:"Y",counter:"C",score:3}  // scissors draw
];

const valueCounter = {
    A:1,
    B:2,
    C:3
};

function play (opponent,goal)  {
    const scenario = scorecard.filter((value)=>{
        return (value.opponent == opponent && value.goal == goal);
    });
    const counterScore = valueCounter[scenario[0].counter];
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