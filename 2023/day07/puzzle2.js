// const data = [
//     // '32T3K 765',
//     // 'T55J5 684',
//     // 'KK677 28',
//     // 'KTJJT 220',
//     // 'QQQJA 483',
//     'J3J58 21','7T779 22'

// ];

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

let scores =    {'A':'12',
                'K':'11',
                'Q':'10',
                'T':'09',
                '9':'08',
                '8':'07',
                '7':'06',
                '6':'05',
                '5':'04',
                '4':'03',
                '3':'02',
                '2':'01',
                'J':'00'};


function wintype (cards) {
    const groups = {};
    let score = cards.split('').reduce((p,c)=>p += scores[c],''); // assign basic score to hand for ordering

    let joker =0;

    console.log(cards);
    while (cards.length>0) {
        let [ca,...check] = cards;
        if (ca == 'J') {
            joker += 1;
            cards = check;
        } else {
            let newDeck = [];
            let cnt = 1;
            for (let i=0; i < check.length ; i++) {
                let cb = check[i];

                if (cb!='J'&& ca == cb) cnt ++;
                else newDeck.push(cb);
            }
            if (cnt > 1) {
                let g = 'g' + cnt;
                if (groups.hasOwnProperty(g)) groups[g] ++;
                else groups[g] = 1;
            }
            cards = newDeck;
        }
    }

    if (joker>0) {
        while (joker>0) {
            if (groups.hasOwnProperty('g4')) {
                groups['g5'] = 1;
                delete groups['g4'];
            }
            else if (groups.hasOwnProperty('g3')) {
                groups['g4'] = 1;
                delete groups['g3'];
            }
            else if (groups.hasOwnProperty('g2')) {
                groups['g3'] = 1;
                groups['g2'] = groups['g2'] -1;
                if (groups['g2'] == 0) delete groups['g2'];
            }
            else groups['g2'] = 1;
            joker -= 1;
        }
    }

    // score = 0
    if (groups.hasOwnProperty('g5')) score = '7' + score;                                     // five of a kind
    else if (groups.hasOwnProperty('g4')) score = '6' + score;                                // four of a kind
    else if (groups.hasOwnProperty('g3') && groups.hasOwnProperty('g2')) score = '5' + score; // full house
    else if (groups.hasOwnProperty('g3')) score = '4' + score;                                // three of a kind
    else if (groups.hasOwnProperty('g2') && groups['g2']==2) score = '3' + score;             // two pair of a kind
    else if (groups.hasOwnProperty('g2')) score = '2' + score;                                // one pair of a kind
    else  score = '1' + score;
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