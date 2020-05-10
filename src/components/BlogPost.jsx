/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './global.scss';
import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import Prism from 'prismjs';
import SEO from '@americanexpress/react-seo';
import styles from './styles.scss';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({ post, SideBar }) => {
  const mediaImage = post.better_featured_image
  && post.better_featured_image.media_details.sizes.medium.source_url;
  const keywords = post.afc && post.acf.meta_keywords.split(', ');
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <React.Fragment>
      <SEO
        article={true}
        author="Ruben Casas"
        description={post.excerpt.rendered}
        keywords={keywords}
        title={post.title.rendered}
        image={{ src: mediaImage }}
        lang="en-GB"
        meta={[{ charset: 'utf-8' }]}
        pathname={`https://infoxicator.com/${post.slug}`}
      />
      <Container fluid={true}>
        <h1 className={styles.postTitle}>{post.title.rendered}</h1>
        <p className="mt-3">Published {dayjs(post.date).format('MMMM DD, YYYY')}</p>
        <div className={`${styles.line} mb-5`} />
        <div className={`${styles.article} mb-5`} dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
        <Container> <SideBar hideImage={true} postTitle="Popular Posts" /></Container>
      </Container>
    </React.Fragment>
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
