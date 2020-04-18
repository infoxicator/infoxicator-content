/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Prism from 'prismjs';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const createMarkup = (markup) => ({ __html: markup });

const useStyles = makeStyles((theme) => ({
  htmlContent: {
    ...theme.typography.body1,
    padding: theme.spacing(3, 0),
    fontSize: '1.25rem',
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const BlogPost = ({ post, SideBar }) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  const classes = useStyles();

  return (
    <Grid container={true} spacing={5} className={classes.mainGrid}>
      <Grid item={true} xs={12} md={8}>
        <Typography variant="h3" gutterBottom={true}>
          {post.title.rendered}
        </Typography>
        <Divider />
        <div className={classes.htmlContent}>
          <p dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
          <div dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
        </div>
      </Grid>
      <Grid item={true} xs={12} md={4}>
        <SideBar hideImage={true} />
      </Grid>
    </Grid>
  );
};

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({ rendered: PropTypes.string }),
    date: PropTypes.string,
    excerpt: PropTypes.shape({ rendered: PropTypes.string }),
    content: PropTypes.shape({ rendered: PropTypes.string }),
    better_featured_image: PropTypes.shape({ source_url: PropTypes.string }),
  }).isRequired,
};

export default BlogPost;
