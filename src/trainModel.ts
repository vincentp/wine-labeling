import brain from 'brain.js';
import fs from 'fs';
import readline from 'readline';

const net = new brain.recurrent.LSTM();

interface LabeledDataRow {
  input: string;
  //output: 'domain' | 'city' | 'cepage' | 'made_in';
  output: string;
}

async function loadLabeledData(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let labeledData: LabeledDataRow[] = [];
  
  rl.on('line', (line) => {
    const lineData = line.split(',');
  
    let d: LabeledDataRow = {
      input: lineData[0].toLowerCase(),
      output: lineData[1]
    };
  
    labeledData.push(d);  
  });

  rl.on('close', () => {
    trainModel(labeledData);
  });
}

const trainModel = (data) => {
  net.train(data, {
    iterations: 1000
  });
  
  const json = net.toJSON();
  fs.writeFile('model.json', JSON.stringify(json), 'utf8', () => {});
}

loadLabeledData('data/labeledData.csv');
