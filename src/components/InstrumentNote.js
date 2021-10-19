import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  instrumentNote: note => {
    const backgroundColor = (note.playing && 'red') || note.accidental ? 'black' : 'white';

    return {
      flex: "1",
      backgroundColor,
      borderRight: "solid 1px black",
      "&:last-child": {
        borderRight: "none",
      }
    }
  },
});

export const InstrumentNote = props => {
  const { note } = props;
  const classes = useStyles(note);

  return <div className={classes.instrumentNote}></div>;
};
