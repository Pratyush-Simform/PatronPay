import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        // flexWrap: 'wrap',
        overflowY: 'auto'
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '95%',
        },
      },
  }));
  