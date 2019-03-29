import * as tesseract from 'node-tesseract';
import path from 'path';
import brain from 'brain.js';
import fs from 'fs';

interface tesseractOptions {
  l?: string,
  psm?: number,
  config?: any,
  binary?: string
}

const filesPath = [
  path.join(__dirname, '..', 'img', 'label-4.png')
];

const options = {
  l: 'fra'
} as tesseractOptions;

const extractTextFromLabel = async (filePath: string): Promise<string[]> => {

  return new Promise((resolve, reject) => {
    tesseract.process(filePath, options, (err, text) => {
      let lines: string[] = [];

      if (err) {
        console.error(err);
      } else {
        text.split(/\r?\n/).forEach(line => {
          if (line.trim() !== '') {
            lines.push(line.trim());
            //console.log(line.trim());
          }
        });
      }

      resolve(lines);
    });
  });
}

const processLabel = async (net, filePath: string) => {
  console.log(`Processing label: ${filePath}`);

  let lines = await extractTextFromLabel(filePath);

  lines.forEach(line => {
    console.log(line, ' : ', net.run(line.toLowerCase()));        
  });
}

const initModel = (jsonModel) => {  
  const net = new brain.recurrent.LSTM();
  net.fromJSON(jsonModel);  

  filesPath.forEach(filePath => {
    processLabel(net, filePath);
  });
}

const loadModel = (modelFilePath) => {
  fs.readFile(modelFilePath, 'utf8', function readFileCallback(err, data){
    initModel(JSON.parse(data));
  });
};

loadModel('model.json');