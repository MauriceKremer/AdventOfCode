const rotateClockwise = (source) => {
    result = [];
    for (let column = 0, columns = source[0].length; column < columns; column++){
        result.push([]);
        let cnt=0;
        for (let row = source.length - 1; row >= 0; row--){
            result[column][row] = source[cnt][column];
            cnt++;
        }
    }
    return result;
}

let a = [
    [1,2,3,4],
    [5,6,7,8]
];

console.log(JSON.stringify(a));
a= rotateClockwise(a);
console.log(JSON.stringify(a));
a= rotateClockwise(a);
console.log(JSON.stringify(a));
a= rotateClockwise(a);
console.log(JSON.stringify(a));
a= rotateClockwise(a);
console.log(JSON.stringify(a));