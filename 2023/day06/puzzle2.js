/*
Time:        42     68     69     85
Distance:   284   1005   1122   1341
*/

//sample
// const rt = 71530;
// const distances = 940200;

const rt = 42686985; 
const distance = 284100511221341;

let wincombos = 0;
for (let s = 1; s <= rt ; s ++) { // time chaging
    const d = s * (rt - s);
    if (d > distance) {
        wincombos ++;
        //console.log(s,distance);
    } 
}

console.log(wincombos);