const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class licenseCode {

    constructor (data) {
        this.coordinates = [];
        data.split(/\r?\n/).forEach(row => {

            // read coordinates
            if (row.indexOf(',')> -1) {
                let xy = row.split(/,/);
                this.coordinates.push([parseInt(xy[0]),parseInt(xy[1])]);
            }

            if (row.indexOf('fold along y')>-1) {
                this.transposeOverY(parseInt(row.split('=')[1]));
                this.dotCount();
            }

            if (row.indexOf('fold along x')>-1) {
                this.transposeOverX(parseInt(row.split('=')[1]));
                this.dotCount();
            }

        });
    }

    dotCount() {

        let a = new Set();

        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i];
            a.add(JSON.stringify(coordinate));    
        }

        console.log('visible dots',a.size);
        
    }

    printGrid() {
        let maxX = 0;
        let maxY = 0;
        let map = [];

        // analyse grid size
        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i];
            if (coordinate[0]>maxX) maxX = coordinate[0];
            if (coordinate[1]>maxY) maxY = coordinate[1];        
        }

        // render an empty grid
        for (let y = 0; y <= maxY; y++) {
            let row = [];
            for (let x = 0; x <= maxX; x++) {
                row.push('');
            }
            map.push(row);            
        }
        
        // render coordinates
        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i];
            map[coordinate[1]][coordinate[0]] = '#';      
        }

        console.table(map);

    }

    transposeOverY(yFold) {
        this.coordinates.map( c => {
            c[1] = (c[1]<yFold)?c[1]:yFold -(c[1]-yFold);
        });
    }

    transposeOverX(xFold) {
        this.coordinates.map( c => {
            c[0] = (c[0]<xFold)?c[0]:xFold -(c[0]-xFold);
        });
    }


}

const game = new licenseCode(data);

game.printGrid();
