import { useState, useEffect } from "react";
import { tune, retune } from "../core/tuner";
import midi from "../core/midi";
import { Instrument } from "./Instrument";
import { Controls } from "./Controls";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  deviceContainer: {
    flex: 1,
    display: "grid",
    gridTemplateRows: "100%",
    gridTemplateColumns: "40px auto",
  },
});

export const Device = () => {
  const classes = useStyles();
  const [notesState, setNotesState] = useState(tune());
  const [instrumentNotesState, setInstrumentNotesState] = useState([]);

  useEffect(() => {
    function onNotePlaying(frequency, playing) {
      setInstrumentNotesState((previousInstrumentNotesState) => {
        if (previousInstrumentNotesState.has(frequency)) {
          const note = Object.assign(
            {},
            previousInstrumentNotesState.get(frequency),
            { playing }
          );
          return new Map([...previousInstrumentNotesState, [frequency, note]]);
        } else {
          return previousInstrumentNotesState;
        }
      });
    }

    midi((MIDIAccess) => MIDIAccess.onnoteplaying(onNotePlaying));
  }, []);

  useEffect(() => {
    setInstrumentNotesState(notesState);
  }, [notesState]);

  const toggleSelectNote = (noteSelected) => {
    const frequency = noteSelected.frequency;

    setInstrumentNotesState((previousInstrumentNotesState) => {
      if (previousInstrumentNotesState.has(frequency)) {
        const previousNote = previousInstrumentNotesState.get(frequency);
        const note = Object.assign(
          {},
          previousNote,
          { selected: !previousNote.selected }
        );
        return new Map([...previousInstrumentNotesState, [frequency, note]]);
      } else {
        return previousInstrumentNotesState;
      }
    });
  };

  const moveNotes = (semitones = 1) => {
    setNotesState((previousNotesState) => {
      return retune(previousNotesState, semitones);
    });
  }

  return (
    <div className={classes.deviceContainer}>
      <Controls moveNotes={moveNotes} />
      <Instrument
        instrumentNotes={instrumentNotesState}
        toggleSelectNote={toggleSelectNote}
      />
    </div>
  );
};
