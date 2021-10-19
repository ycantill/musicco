import { A4 } from "./constants.js";

// TODO: REFACTOR
const parseNote = (stringNote) => {
  const regex = new RegExp(
    `(?<name>[A-G]{1})(?<accidental>#|b)*(?<alternative>\\/[A-G]b)*(?<octave>[0-9])*`,
    "i"
  );
  const match = stringNote.match(regex);

  if (!!match) {
    const { name, accidental, octave } = match.groups;

    return { 
      name: name.toUpperCase(), 
      accidental,
      ...(octave && { octave: parseInt(octave) }) 
    };
  } else {
    throw Error('The string does not match a note notation.')
  }
}

const getFrequencyByExponent = (frequency, exponent) => {
  return frequency * Math.pow(2, exponent);
}

const getFrequencyFromMidiNote = (note) => {
  return getFrequencyByExponent(A4.frequency, (note - 69) / 12);
}

const getFrequencyByOctaves = (frequency, octave) => {
  if (!Number.isInteger(octave)) {
    throw new Error('The octave must be a integer number.');
  }
  return getFrequencyByExponent(frequency, octave);
}

const getFrequencyBySemitones = (frequency, semitones) => {
  if (!Number.isInteger(semitones)) {
    throw new Error('The semitones must be a integer number.');
  }
  return getFrequencyByExponent(frequency, semitones / 12);
}

export {
  getFrequencyBySemitones,
  getFrequencyFromMidiNote,
  getFrequencyByOctaves,
  parseNote
};
