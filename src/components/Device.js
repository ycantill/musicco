import { useState, useEffect } from "react";
import { tune, retune } from "../core/tuner";
import midi from "../core/midi";
import { Instrument } from "./Instrument";
import { Controls } from "./Controls";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  deviceContainer: {
    flex: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '40px auto'
  }
});

export const Device = () => {
  const classes = useStyles();
  const [notesState, setNotesState] = useState(tune());
  const [instrumentNotesState, setInstrumentNotesState] = useState([]);

  function moveNotes(semitones = 1) {
    setNotesState((previousNotesState) => {
      return retune(previousNotesState, semitones);
    });
  }

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

  useEffect(() => {
    console.log(instrumentNotesState);
  }, [instrumentNotesState]);

  return (
      <div className={classes.deviceContainer}>
            <Controls moveNotes={moveNotes}></Controls>
            <Instrument notes={instrumentNotesState}></Instrument>
      </div>
  );
}
