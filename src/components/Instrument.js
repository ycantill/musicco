import { createUseStyles } from "react-jss";
import { InstrumentNote } from "./InstrumentNote";

const useStyles = createUseStyles({
  instrumentContainer: {
    display: "flex",
    flexDirection: "row",
    borderLeft: "1px solid black",
  },
});

export const Instrument = (props) => {
  const classes = useStyles();
  const instrumentNotes = [...props.instrumentNotes.values()];
  const { toggleSelectNote } = props;

  return (
    <div className={classes.instrumentContainer}>
      {instrumentNotes.map((note, index) => (
        <InstrumentNote
          key={note.frequency}
          note={note}
          toggleSelectNote={toggleSelectNote}
          noteNumber={index + 1}
        >
        </InstrumentNote>
      ))}
    </div>
  );
};
