import React, { Fragment } from 'react';
import lello from '../../img/404lello.png';
import decaro from '../../img/404decaro.png';
import {
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '35%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: '200',
    letterSpacing: '.7rem'
  },
}));


const NotFound = () => {
  const classes = useStyles();
  const generateImage = () => {
    var y = Math.random();
    if (y < 0.5) return <img src={lello} className={classes.img} />
    else return <img src={decaro} className={classes.img} />
  }

  return (
    <Fragment>
      <Typography
        className={classes.title}
        component="h1"
        variant="h1"
        align="center"
      >
        404
        </Typography>
      <Typography
        component="h5"
        variant="h5"
        align="center"
      >
        Sorry, this page does not exist
        </Typography>



      {generateImage()}

    </Fragment>
  );
};

export default NotFound;
