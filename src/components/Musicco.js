import { Device } from "./Device";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  appContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});

export const Musicco = () => {
  const classes = useStyles();

  return (
    <div className={classes.appContainer}>
      <Device/>
    </div>
  )
}
