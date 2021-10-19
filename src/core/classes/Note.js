import { ANGLO_NOTES_NAMES_WITH_ACCIDENTALS } from "../constants.js";

export class Note {
  constructor(frequency, name, octave) {
    this.frequency = frequency;
    this.name = name;
    this.octave = octave && parseInt(octave);
    this.playing = false;
    this.accidental = name.includes('#');
  }

  // TODO: REFACTOR
  getSiblingStringNote (direction = 1) {
    const octave = this.octave;
    const length = ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.length;
    const noteIndex = ANGLO_NOTES_NAMES_WITH_ACCIDENTALS.indexOf(this.name);
    const siblingIndex = noteIndex + direction;

    return ANGLO_NOTES_NAMES_WITH_ACCIDENTALS[siblingIndex] ?
      `${ANGLO_NOTES_NAMES_WITH_ACCIDENTALS[siblingIndex]}${this.octave}`:
      `${ANGLO_NOTES_NAMES_WITH_ACCIDENTALS[length - (siblingIndex * direction)]}${octave + direction}`;
  }

  getNextStringNote () {
    return this.getSiblingStringNote();
  }

  getPreviousStringNote () {
    return this.getSiblingStringNote(-1);
  }
}
