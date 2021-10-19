import { createUseStyles } from 'react-jss'
import { InstrumentNote } from './InstrumentNote'

const useStyles = createUseStyles({
  instrumentContainer: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black'
  }
});

export const Instrument = props => {
  const classes = useStyles();
  const { notes } = props;

  return (
    <div className={classes.instrumentContainer}>
      {[...notes.values()].map(note => <InstrumentNote key={note.frequency} note={note}></InstrumentNote>)}
    </div>
  )
}