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
    const MK3 = [...MIDIAccess.inputs.values()].find(output => output.name === 'Keystation Mini 32 MK3');
    const loopMIDI = [...MIDIAccess.outputs.values()].find(output => output.name === 'loopMIDI Port');

    console.log([...MIDIAccess.inputs.values()]);
    console.log(loopMIDI);

    MK3.onmidimessage = function (message) {
        const [type, note, velocity] = message.data;

        if (type === NOTE_MIDI_TYPE) {
            const frequency = parseInt(getFrequencyFromMidiNote(note));

            // const NoteOnOff = velocity ? 0x90 : 0x80;
            // var noteOnMessage = [NoteOnOff, note, 0x7f]; 
            // loopMIDI.send(noteOnMessage);
            callback(frequency, !!velocity)
        }
    };
}

const midi = async function (callback) {
    if (navigator.requestMIDIAccess) {
        try {
            const MIDIAccess = await navigator.requestMIDIAccess();

            MIDIAccess.onstatechange = onChangeInstrumentState;
            MIDIAccess.onnoteplaying = onNotePlaying;

            callback(MIDIAccess);
        } catch (error) {
            throw new Error('There was an error loading midi.', error);
        }
    } else {
        throw new Error('The browser does not support MIDI devices.');
    }
};

export default midi;
