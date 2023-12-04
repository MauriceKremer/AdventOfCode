function prizeCheck(line) {
    const winningNumbers = getNumbers(line.split(':')[1].split('|')[0]);
    const myNumbers = getNumbers(line.split(':')[1].split('|')[1]);
    return score(countMatches(winningNumbers,myNumbers));
};

function getNumbers(text) {
    text = text.trim();
    return text.split(/\s{1,2}/).map(item => parseInt(item));
};

function countMatches(array1,array2) {
    const first = new Set(array1);
    let matches = 0;
    for (let i in array2) {
        let item = array2[i];
        if (first.has(item)) matches ++;
    }
    return matches;
};

function score(matches) {
    if (matches == 0) return 0;
    return Math.pow(2,matches-1);
};

let accumulatedScore = 0;
let multipliers = {};

function reset() {
    accumulatedScore = 0;
    multipliers = {};
}

function prizeCheck2(line) {
    const carddetails = line.split(':')[0];
    const winningNumbers = getNumbers(line.split(':')[1].split('|')[0]);
    const myNumbers = getNumbers(line.split(':')[1].split('|')[1]);

    let matches = countMatches(winningNumbers,myNumbers);
    let playedCards = updateMultipliers (carddetails,matches);
    accumulatedScore = accumulatedScore + playedCards;
    return accumulatedScore;
}

function updateMultipliers (cardId,matches) {

    let indexName = 'index' + cardIdNumber(cardId);
    let numberOfCards = (multipliers.hasOwnProperty(indexName))?multipliers[indexName]:1;

    for (let i = 1; i <= matches; i++) {

        let cardIdUpdate = 'index' + (cardIdNumber (cardId) + i); 
        if (multipliers.hasOwnProperty(cardIdUpdate)) {
            multipliers[cardIdUpdate] = multipliers[cardIdUpdate] + numberOfCards;
        } else {
            multipliers[cardIdUpdate] = 1 + numberOfCards;
        }
    }
    return numberOfCards;
}

function cardIdNumber (text) {
    return parseInt(text.split(/\s+/)[1]);
}

module.exports = {prizeCheck,getNumbers,countMatches, score, cardIdNumber, updateMultipliers, prizeCheck2, reset};