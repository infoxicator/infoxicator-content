/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './global.scss';
import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import Prism from 'prismjs';
import styles from './styles.scss';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({ post, SideBar }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <Container fluid={true}>
      <h1 className={styles.postTitle}>{post.title.rendered}</h1>
      <p className="mt-3">Published {dayjs(post.date).format('MMMM DD, YYYY')}</p>
      <div className={`${styles.line} mb-5`} />
      <div className={`${styles.article} mb-5`} dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
      <Container> <SideBar hideImage={true} postTitle="Popular Posts" /></Container>
    </Container>
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
