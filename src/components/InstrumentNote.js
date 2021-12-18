import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  instrumentNote: (note) => {
    const backgroundColor =
      note.playing ? (note.selected ? "green" : "darkgray") : (note.accidental ? "black" : "white");

    return {
      backgroundColor,
      flex: 1,
      display: "flex",
      alignItems: "start",
      borderRight: "solid 1px black"
    };
  },
  noteSelection: (note) => {

    const color = note.selected ? "white" : (note.accidental ? "white" : "black");
    
    return {
      width: "100%",
      height: "20%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color,
      backgroundColor: note.selected && 'green'
    }
  },
});

export const InstrumentNote = (props) => {
  const { note, toggleSelectNote, noteNumber } = props;
  const classes = useStyles(note);

  return (
    <div className={classes.instrumentNote}>
      <div
        className={classes.noteSelection}
        onClick={() => toggleSelectNote(note)}
      >
        {noteNumber}
      </div>
    </div>
  );
};
