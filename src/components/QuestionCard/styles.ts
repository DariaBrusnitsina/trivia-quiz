import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  display: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  card: {
    maxWidth: 600,
    margin: '10% auto',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    border: '2px solid black',
    boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
  },
  questions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  disabled: {
    disabled: 'true',
  },
  enabled: {
    disabled: 'false',
  },
}));
