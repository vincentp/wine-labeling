# Wine labels details

Using tesseract (OCR) and brain.js (Neural Networks)

https://github.com/desmondmorris/node-tesseract

https://github.com/BrainJS/brain.js

## Requirements

    brew install tesseract tesseract-lang

## Usage

		// Will train the model and save it to a JSON file
		npm run trainModel

		// Will pick images within the /img folder
		// - extract text
		// - run it through the model
		npm run dev