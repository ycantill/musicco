import { OctaveNavigator } from "./OctaveNavigator";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Controls = props => {
  const classes = useStyles();
  const { moveNotes } = props;

  return (
    <div className={classes.controlsContainer}>
      <OctaveNavigator semitones={1} moveNotes={moveNotes}></OctaveNavigator>
      <OctaveNavigator semitones={-1} moveNotes={moveNotes}></OctaveNavigator>
    </div>
  );
}
