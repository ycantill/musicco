import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  octaveNavigatorContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2em',
  }
});

export const OctaveNavigator = props => {
  const classes = useStyles();
  const { moveNotes, semitones } = props;

  return (
    <div
      className={classes.octaveNavigatorContainer}
      onClick={() => moveNotes(semitones)}
    >
      { semitones > 0 ? 
        <FontAwesomeIcon icon={faChevronRight} /> :
        <FontAwesomeIcon icon={faChevronLeft} />
      }
    </div>
  );
}
