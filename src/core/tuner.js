import { Note } from "./classes/Note.js";
import { A4, ANGLO_NOTES_NAMES_WITH_ACCIDENTALS } from "./constants.js";
import {
  getFrequencyByOctaves,
  getFrequencyBySemitones,
  parseNote
} from "./theory.js";

const DEFAULT_FIRST_NOTE = 'C';

const getFirstNote = function () {
  return this.get([...this.keys()][0]);
}

// TODO: REFACTOR THIS FUNCTION
const retune = (notes, semitones) => {
  if (semitones === 1 || semitones === -1) {
    const first = getFirstNote.call(notes);
    const sibling = semitones > 0 ? first.getNextStringNote() : first.getPreviousStringNote();

    return tune(sibling);
  } else {
    return notes;
  }
}
// END TODO

const getNotesNamesIndexDistance = (start, end) => {
  return ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.indexOf(start) - ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.indexOf(end)
}

const getAllNotesNames = (note, octaves) => {
  const regex = new RegExp(`(?<tail>.*${note}|.*${note}\\/\\w*)\\|`);
  const { tail } = ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.join('|').concat('|').match(regex)?.groups;

  return `${ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.join('|')}|`
        .repeat(octaves)
        .concat(`${tail}`)
        .split('|');
}

const tune = (start = 'C3', octaves = 1) => {
  const { name: startName, accidental = '', octave: startOctave = 4 } = parseNote(start);
  const allNotesNames = getAllNotesNames(`${startName}${accidental}`, octaves);
  const octavedFrequencyOfCNote = getFrequencyBySemitones(
    getFrequencyByOctaves(A4.frequency, startOctave - A4.octave), 
    getNotesNamesIndexDistance(DEFAULT_FIRST_NOTE, A4.name)
  );
  const semitonesFromCNoteToStartNote = Math.abs(getNotesNamesIndexDistance(DEFAULT_FIRST_NOTE, allNotesNames[allNotesNames.length - 1]));

  const notes = new Map(
    allNotesNames
    .reduce((accumulator, name, semitones) => {

      if (semitones >= semitonesFromCNoteToStartNote) {

        const octave = parseInt(semitones / 12) + startOctave;
        const frequency = parseInt(getFrequencyBySemitones(octavedFrequencyOfCNote, semitones));
  
        return accumulator.concat([[frequency, new Note(frequency, name, octave)]]);
      } else {
        return accumulator;
      }
    }, [])
  );

  return notes;
}

export { tune, retune };
