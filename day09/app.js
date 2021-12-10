const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
//const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class hightMapParser {

    constructor(data) {
        data.split(/\r?\n/).array.forEach(row => {
            for (let column = 0; column < row.length; column++) {
                const value = row[column];
                
            }
        });
    }


}