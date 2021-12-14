const { Console } = require('console');
const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class polymer {

    constructor (data) {
        this.pairInsertionRules = {};
        this.initialSequence = '';
        this.tally = {};
        this.cache = {};

        data.split(/\r?\n/).forEach(row => {
            if (row.length > 0 && row.indexOf('->')==-1) {
                this.initialSequence = row;
            }
            if (row.length > 0 && row.indexOf('->')>-1) {
                let rules = row.split(' -> ');
                this.pairInsertionRules[rules[0]] = rules[1];
            }
        });
    }

    getSequence(input, cyclesRemaining) {

        if (this.cache.hasOwnProperty(input+cyclesRemaining)) {
            return this.cache[input+cyclesRemaining];
        }

        cyclesRemaining--;
        let result = input[0] + this.pairInsertionRules[input] + input[1];
        let tally = this.score(this.pairInsertionRules[input]);

        if (cyclesRemaining > 0) {  
            tally = this.tallyScore(tally,this.getSequence(result[0]+result[1],cyclesRemaining));
            tally = this.tallyScore(tally,this.getSequence(result[1]+result[2],cyclesRemaining));
        }

        this.cache[input+(cyclesRemaining+1)] = tally;
        return tally;
       

    }

    grow(x) {

        let tally = this.score(this.initialSequence);
        for (let i = 0; i < this.initialSequence.length-1; i++) {
            console.log('position',i);
            const element = this.initialSequence[i] + this.initialSequence[i+1];
            this.tallyScore(tally,this.getSequence(element, x)); 
        }

        console.log(tally);

        let high = 0;
        let low = -1;
        for (const key in tally) {
            if (tally[key] > high) high = tally[key];
            if (low == -1 || tally[key] < low) low = tally[key];
        }
        console.log(high-low);

    }

    tallyScore(scoreSource,scoreAddition) {
        for (const key in scoreAddition) {
            if (!scoreSource.hasOwnProperty(key)) scoreSource[key] = scoreAddition[key];
            else scoreSource[key] += scoreAddition[key];
        }
        return scoreSource;

    }

    score(result) {
        let tally = {};

        for (let i = 0; i < result.length; i++) {
            const char = result[i];
            if (!tally.hasOwnProperty(char)) tally[char] = 1;
            else tally[char] += 1;
        }
        return tally;
    }

}

const game = new polymer(data);
game.grow(40);