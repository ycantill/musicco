import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  instrumentNote: (note) => {
    const backgroundColor =
      (note.playing && "green") || note.accidental ? "black" : "white";

    return {
      backgroundColor,
      flex: 1,
      display: "flex",
      alignItems: "start",
      borderRight: "solid 1px black"
    };
  },
  noteSelection: (note) => ({
    width: "100%",
    height: "20%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: (note.accidental || note.selected) ? "white" : "black",
    backgroundColor: note.selected && 'green'
  }),
});

export const InstrumentNote = (props) => {
  const { note, toggleSelectNote, children } = props;
  const classes = useStyles(note);

  return (
    <div className={classes.instrumentNote}>
      <div
        className={classes.noteSelection}
        onClick={() => toggleSelectNote(note)}
      >
        {children}
      </div>
    </div>
  );
};
