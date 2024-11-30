
// sample
// const data = [
//     '0 3 6 9 12 15',
//     '1 3 6 10 15 21',
//     '10 13 16 21 30 45'
// ];

//real
const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

let score = 0;

for (let i = 0,j =data.length ; i < j;i++) {
    let ready = false;
    let diffs = [];
    diffs.push(data[i].split(' ').map(x=>parseInt(x)));
    while (!ready) {
        let last = diffs[diffs.length-1];
        let next = [];
        ready = true;
        for (let k=1,l=last.length;k<l;k++){
            next.push(last[k]-last[k-1]);
            if (next[k-1]!=0) ready = false;
        }
        diffs.push(next);
    }

    let increment =0;
    while (diffs.length>0) {
        const last = diffs.pop();
        increment = last[0] - increment;
    }

    score += increment;

}
console.log(score);