import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  htmlContent: {
    padding: theme.spacing(3, 0),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
const LoadingSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid container={true} spacing={5} className={classes.mainGrid}>
      <Grid item={true} xs={12} md={8}>
        <Skeleton animation="wave" height={40} width="30%" />
        <Divider />
        <div className={classes.htmlContent}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Divider />
          <Skeleton animation="wave" height={40} width="30%" />
          <Divider />
          <Skeleton animation="wave" variant="rect" height={200} />
          <Divider />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      </Grid>
    </Grid>
  );
};

export default LoadingSkeleton;
