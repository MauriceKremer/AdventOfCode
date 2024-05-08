const fs = require('fs');
const readline = require('readline');
const { json } = require('stream/consumers');

let currentDir = [];
let structure = {};
let nice = 0;

class file {
  constructor(name,size) {
    this.name = name;
    this.size = size;
  }
}

class directory {
  name;
  fullname;
  files = {};
  directories = {};

  constructor(name, fullname){
    this.name = name;
    this.fullname = fullname;
    console.log(this.fullname);
  }

  addDirectoryToDirectory(dirPath, fullname) {
    if (dirPath.length == 1) {
      this.directories[dirPath[0]] =  new directory(dirPath[0], fullname);
    } else {
      let childDir = dirPath[0];
      this.directories[childDir].addDirectoryToDirectory([...dirPath].splice(1), fullname);
    }
  }

  addFileToDirectory(dirPath,file){
    if (dirPath.length == 0) {
      this.files[file.name] = file;
    } else {
      this.directories[dirPath[0]].addFileToDirectory([...dirPath].splice(1),file);
    }
  }

  getSize() {
    let size = 0;
    for (let key in this.files) {
      size += this.files[key].size;
    }

    for (let key in this.directories){
      size += this.directories[key].getSize();
    }

    if (size<100000) { 
      console.log(' *** ', this.fullname ,size);
      nice += size;
    }

    return size;
  }
}

function parseLine(line) {
  let data = line.split(' ');

  if (data[0] == '$') {
    if (data[1] == 'cd') {
      if (data[2] == '/') {
        currentDir = [];
        structure = new directory('/',currentDir);
      } else if (data[2] == '..') {
        currentDir.pop(); // move one directory up
      } else {
        currentDir.push(data[2]); // move into directory
        structure.addDirectoryToDirectory([...currentDir],currentDir);
      }
    } else if (data[1] == 'ls') {
      // ignore
    } 
  } 
  else {
      if (data[0] == 'dir') {
        // ignore
      } else {
        // files
        let fileItem = new file(data[1],Number(data[0]));
        structure.addFileToDirectory(currentDir,fileItem);

      }
    }

}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });
  
    let readStacks = true;
    rl.on('line', (line) => {
      parseLine(line);
    });

    await new Promise((res) => rl.once('close', res));
    console.log(structure.getSize());
    console.log(nice);
  })();