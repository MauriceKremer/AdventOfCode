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
            }

            if (row.indexOf('fold along x')>-1) {
                this.transposeOverX(parseInt(row.split('=')[1]));
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
        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i];
            if (coordinate[1]<yFold) continue;
            let newY = yFold - (coordinate[1] - yFold);
            this.coordinates[i] =  [coordinate[0],newY];   
        }
        this.dotCount();
    }

    transposeOverX(xFold) {
        for (let i = 0; i < this.coordinates.length; i++) {
            const coordinate = this.coordinates[i];
            if (coordinate[0]<xFold) continue;
            let newX = xFold - (coordinate[0] - xFold);
            this.coordinates[i] =  [newX,coordinate[1]];   
        }
        this.dotCount();
    }


}

const game = new licenseCode(data);

game.printGrid();
