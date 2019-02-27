import * as tesseract from 'node-tesseract';
import path from 'path';

const filePath = path.join(__dirname, '..', 'img', 'label-1.png');

const options = {
  l: 'fra'
};

tesseract.process(filePath, options, (err, text) => {
  if (err) {
    console.error(err);
  } else {
    text.split(/\r?\n/).forEach(line => {
      if (line.trim() !== '')
       console.log(line.trim());
    });
  }
});