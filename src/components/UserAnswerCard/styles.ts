import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  answer: {
    marginTop: '25px',
    display: 'grid',
    gridTemplateColumns: '1fr 5fr',
  },
  true: {
    color: '#75C684',
  },
  false: {
    color: '#E06B6E',
  },
  row: {
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
