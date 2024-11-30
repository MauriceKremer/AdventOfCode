/*
Time:        42     68     69     85
Distance:   284   1005   1122   1341
*/

//sample
// const racetimes = [7,15,30];
// const distances = [9,40,200];

const racetimes = [42,68,69,85];
const distances = [284,1005,1122,1341];

let score;

for(let i in racetimes) {
    const rt = racetimes[i];
    let wincombos = 0;
    for (let s = 1; s <= rt ; s ++) { // time chaging
        const distance = s * (rt - s);
        if (distance > distances[i]) {
            wincombos ++;
            //console.log(s,distance);
        } 
    }
    score = (score==undefined)?wincombos:score*wincombos;
}

console.log(score);