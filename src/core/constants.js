// TODO: REFACTOR
const INTERVALS = [
  { name: "P1", fr: "1:1" },
  { name: "m2", fr: "16:15" },
  { name: "M2", fr: "9:8" },
  { name: "m3", fr: "6:5" },
  { name: "M3", fr: "5:4" },
  { name: "P4", fr: "4:3" },
  { name: "d5", fr: "45:32" },
  { name: "P5", fr: "3:2" },
  { name: "m6", fr: "8:5" },
  { name: "M6", fr: "5:3" },
  { name: "m7", fr: "16:9" },
  { name: "M7", fr: "15:8" },
  { name: "P8", fr: "2:1" },
];
const ANGLO_NOTES_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
const ANGLO_NOTES_NAMES_WITH_ACCIDENTALS = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
const SCALE_PATTERNS = new Map();
const CHORD_RECIPES = new Map();
const A4 = { 
  frequency: 440,
  name: 'A',
  octave: 4
};

SCALE_PATTERNS.set("mayor", [2, 2, 1, 2, 2, 2, 1]);
SCALE_PATTERNS.set("minor", [2, 1, 2, 2, 1, 2, 2]);
SCALE_PATTERNS.set("chromatic", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
CHORD_RECIPES.set("M3", "major");
CHORD_RECIPES.set("M3+P5", "major");
CHORD_RECIPES.set("m3", "minor");
CHORD_RECIPES.set("m3+P5", "minor");
CHORD_RECIPES.set("m3+d5", "dimished");
CHORD_RECIPES.set("M3+m6", "augmented");

export { ANGLO_NOTES_NAMES, A4, SCALE_PATTERNS, CHORD_RECIPES, INTERVALS, ANGLO_NOTES_NAMES_WITH_ACCIDENTALS };
