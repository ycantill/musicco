import { createUseStyles } from "react-jss"
import { InstrumentNote } from './InstrumentNote'

const useStyles = createUseStyles({
  instrumentNotes: {
    display: "flex",
    flexDirection: "row",
    borderRight: '1px solid black',
    borderLeft: '1px solid black'
  },
});

export const InstrumentScale = props => {
  const classes = useStyles();
  const { notes } = props;

  return (
    <div className={classes.instrumentNotes}>
      {notes.map((note, index) => (
        <InstrumentNote key={note.frequency} note={note}>{ index + 1 }</InstrumentNote>
      ))}
    </div>
  );
};
