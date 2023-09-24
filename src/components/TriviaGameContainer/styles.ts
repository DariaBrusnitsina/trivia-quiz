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
    margin: '40px auto',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    border: '2px solid black',
    boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
  },
  row: {
    margin: '20px 30px 0 30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  loader: {
    margin: '215px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
