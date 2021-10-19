import {
    getFrequencyFromMidiNote
  } from "./theory.js";
const NOTE_MIDI_TYPE = 144;

const onChangeInstrumentState = function (event) {
    const { port: device } = event;
    const { name, state } = device;

    console.log(`${name} ${state}`);
}

const onNotePlaying = function (callback) {
    const MIDIAccess = this;
    const instruments = MIDIAccess.inputs.values();

    for (let instrument = instruments.next();
        instrument && !instrument.done;
        instrument = instruments.next()) {
        instrument.value.onmidimessage = function (message) {
            const [type, note, velocity] = message.data;

            if (type === NOTE_MIDI_TYPE) {
                const frequency = parseInt(getFrequencyFromMidiNote(note));

                callback(frequency, !!velocity)
            }
        };
    }
}

const midi = async function (callback) {
    if (navigator.requestMIDIAccess) {
        try {
            const MIDIAccess = await navigator.requestMIDIAccess();

            MIDIAccess.onstatechange = onChangeInstrumentState;
            MIDIAccess.onnoteplaying = onNotePlaying;

            callback(MIDIAccess);
        } catch (error) {
            throw new Error('There was an error loading midi.');
        }
    } else {
        throw new Error('The browser does not support MIDI devices.');
    }
};

export default midi;
