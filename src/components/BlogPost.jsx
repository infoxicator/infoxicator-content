/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({ post }) => (
  <div className="container">
    <h1 className="title is-1">{post.title.rendered}</h1>
    <p className="subtitle is-4" dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
    <div className="content" dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
  </div>
);

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
