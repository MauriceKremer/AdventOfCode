// const data = [
//     '32T3K 765',
//     'T55J5 684',
//     'KK677 28',
//     'KTJJT 220',
//     'QQQJA 483'
// ];

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

let scores =    {'A':'12',
                'K':'11',
                'Q':'10',
                'J':'09',
                'T':'08',
                '9':'07',
                '8':'06',
                '7':'05',
                '6':'04',
                '5':'03',
                '4':'02',
                '3':'01',
                '2':'00'};


function wintype (cards) {
    const groups = {};
    let score = cards.split('').reduce((p,c)=>p += scores[c],''); // assign basic score to hand for ordering

    while (cards.length>0) {
        let [ca,...check] = cards;

        let newDeck = [];
        let cnt = 1;
        for (let i=0; i < check.length ; i++) {
            let cb = check[i];
            if (ca == cb) cnt ++; // match found
            else newDeck.push(cb); // no match
        }
        if (cnt > 1) {
            let g = 'g' + cnt;
            if (groups.hasOwnProperty(g)) groups[g] ++;  // create group for the counted matches
            else groups[g] = 1;
        }
        cards = newDeck;
    }

    // score = 0
    if (groups.hasOwnProperty('g5')) score = '7' + score;                                     // five of a kind
    else if (groups.hasOwnProperty('g4')) score = '6' + score;                                // four of a kind
    else if (groups.hasOwnProperty('g3') && groups.hasOwnProperty('g2')) score = '5' + score; // full house
    else if (groups.hasOwnProperty('g3')) score = '4' + score;                                // three of a kind
    else if (groups.hasOwnProperty('g2') && groups['g2']==2) score = '3' + score;             // two pair of a kind
    else if (groups.hasOwnProperty('g2')) score = '2' + score;                                // one pair of a kind
    else score = '1' + score;
    return score;
}

function vl(t){
    return parseInt(t.split(' ')[0]);
}

const enhanced = data.map((p) => wintype(p.split(' ')[0]) + ' '+ p);
console.log(enhanced.sort((a,b)=>{ return (vl(a)>vl(b))?1:-1; }));

let total = 0;
for (let i = 0 ; i < enhanced.length ; i++){
    total += parseInt(enhanced[i].split(' ')[2]) * (i+1);
}
console.log(total);