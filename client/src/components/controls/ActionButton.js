import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main
    }
  },
  success: {
    backgroundColor: theme.palette.success.light,
    '& .MuiButton-label': {
      color: 'white'
    }
  },
  failure: {
    backgroundColor: theme.palette.error.light,
    '& .MuiButton-label': {
      color: 'white'
    }
  },
  default: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: 'white'
    }
  }
}));

export default function ActionButton(props) {
  const { color, children, disabled, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}
