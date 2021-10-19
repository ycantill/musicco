import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  instrumentNote: note => {
    const backgroundColor = (note.playing && 'red') || note.accidental ? 'black' : 'white';
    const color = (note.playing && 'white') || note.accidental ? 'white' : 'black';

    return {
      flex: "1",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color,
      backgroundColor,
      borderRight: "solid 1px black",
      "&:last-child": {
        borderRight: "none",
      }
    }
  },
});

export const InstrumentNote = props => {
  const { note, children } = props;
  const classes = useStyles(note);

  return <div className={classes.instrumentNote}>{children}</div>;
};
