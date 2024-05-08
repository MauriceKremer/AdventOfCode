const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

const openings = {
    '(':')',
    '[':']',
    '{':'}',
    '<':'>'
};

const closings = {
    ')':'(',
    ']':'[',
    '}':'{',
    '>':'<'
};

const score = {
    ')':3,
    ']':57,
    '}':1197,
    '>':25137
}

const cleanupScore = {
    ')':1,
    ']':2,
    '}':3,
    '>':4
}

class lineparser {
    constructor() {
        this.syntaxErrorScore = 0;
        this.cleanupScores = [];
    }

    getMedianScore() {
        this.cleanupScores.sort((a,b)=>{return a-b;});
        let median = (this.cleanupScores.length/2)+0.5;
        return this.cleanupScores[median-1];
    }

    parse(data) {
        const lines = data.split(/\r?\n/);
        for (let j = 0; j < lines.length; j++) {
            const line = lines[j];
            let lineStack = [];
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if ( openings.hasOwnProperty(char)) {
                    lineStack.push(char);
                } else {
                    // what was the last char on the stack?
                    let lastChar = lineStack[lineStack.length-1];
                    if (closings[char] === lastChar) {
                        lineStack.pop();
                    } else {
                        // this line is corrupt skip further processing
                        this.syntaxErrorScore += score[char];
                        break;
                    }
                }
                //end of line
                if (i===line.length-1) {
                    if (lineStack.length>0) {
                        let lineCleanupScore = 0;
                        for (let k = lineStack.length-1; k >= 0; k--) {
                            let lastStackChar = lineStack[k];
                            let expected = openings[lastStackChar];
                            lineCleanupScore = (lineCleanupScore * 5) + cleanupScore[expected];
                        }
                        this.cleanupScores.push(lineCleanupScore);
                    }
                }
            }
         }
    }
}

// test problem
let lp = new lineparser();
lp.parse(testdata);
if (lp.syntaxErrorScore !== 26397) {
    throw 'The score is ' +lp.syntaxErrorScore+ ' but should be 26397';
} else {
    if (lp.getMedianScore() !== 288957) {
        throw 'The cleanup score is ' +lp.getMedianScore()+ ' but should be 288957';
    } else {
        console.log('GREAT CODE MAN!!');
    }
}

// real problem
lp = new lineparser();
lp.parse(data);
console.log('Syntaxt score ',lp.syntaxErrorScore);
console.log('Cleanup median ',lp.getMedianScore());
