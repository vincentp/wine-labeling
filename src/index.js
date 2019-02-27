"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tesseract = __importStar(require("node-tesseract"));
var path_1 = __importDefault(require("path"));
var filePath = path_1.default.join(__dirname, '..', 'img', 'label-1.png');
tesseract.process(filePath, function (err, text) {
    if (err) {
        console.error(err);
    }
    else {
        text.split(/\r?\n/).forEach(function (line) {
            if (line.trim() !== '')
                console.log(line.trim());
        });
    }
});
