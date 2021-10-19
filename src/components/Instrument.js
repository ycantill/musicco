import { createUseStyles } from "react-jss";
import { InstrumentNotes } from "./InstrumentNotes";
import { InstrumentScale } from "./InstrumentScale";

const useStyles = createUseStyles({
  instrumentContainer: {
    display: "grid",
    gridTemplateRows: "40px auto",
    gridTemplateColumns: "100%",
  }
});

export const Instrument = (props) => {
  const classes = useStyles();
  const notes = [...props.notes.values()];

  return (
    <div className={classes.instrumentContainer}>
      <InstrumentScale notes={notes} />
      <InstrumentNotes notes={notes} />
    </div>
  );
};
