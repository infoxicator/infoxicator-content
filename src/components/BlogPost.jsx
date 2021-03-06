/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import './global.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import Container from 'react-bootstrap/Container';
import Prism from 'prismjs';
import SEO from '@americanexpress/react-seo';
import styles from './styles.scss';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({
  post, RecentPosts, languageData, localeName,
}) => {
  const currentLocale = localeName.startsWith('es') ? 'es' : 'en';
  const { recentPostsLabel, publishedLabel } = languageData;
  const mediaImage = post.better_featured_image
  && post.better_featured_image.media_details.sizes.medium.source_url;
  const keywords = ((post || {}).acf || {}).meta_keywords || '';
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <React.Fragment>
      <SEO
        article={true}
        author="Ruben Casas"
        description={post.excerpt.rendered}
        keywords={keywords.split(', ')}
        title={post.title.rendered}
        image={{ src: mediaImage }}
        locale={localeName}
        meta={[{ charset: 'utf-8' }]}
        siteUrl={`https://www.infoxicator.com/${post.slug}`}
      />
      <Container fluid={true}>
        <h1 className={styles.postTitle}>{post.title.rendered}</h1>
        <p className="mt-3">{publishedLabel} {dayjs(post.date).locale(currentLocale).format('MMMM DD, YYYY')}</p>
        <div className={`${styles.halfLine} mb-5`} />
        <div className={`${styles.article} mb-5`} dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
        <div className={`${styles.line} my-5`} />
        <RecentPosts postTitle={recentPostsLabel} />
      </Container>
    </React.Fragment>
  );
};

export default BlogPost;
