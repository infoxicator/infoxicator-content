import React, { useEffect } from 'react';
import { configureIguazuSSR, queryModuleWithData } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryCollection } from 'iguazu-rest';
import Container from 'react-bootstrap/Container';
import BlogPost from './BlogPost';
import ErrorPage from './ErrorPage';
import LoadingSkeleton from './LoadingSkeleton';

const InfoxicatorContent = ({
  isLoading, loadedWithErrors, post, RecentPosts, router: { location },
}) => {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors() || (!Array.isArray(post) || !post.length)) return <ErrorPage />;
  return (
    <Container fluid="md" className="mt-5">
      <BlogPost post={post[0]} RecentPosts={RecentPosts} />
    </Container>
  );
};

InfoxicatorContent.propTypes = {
  isLoading: PropTypes.func.isRequired,
  loadedWithErrors: PropTypes.func.isRequired,
  post: PropTypes.arrayOf(PropTypes.object),
  RecentPosts: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  router: PropTypes.shape({ location: PropTypes.shape({}) }).isRequired,
};

InfoxicatorContent.defaultProps = {
  post: [],
  RecentPosts: {},
};

InfoxicatorContent.holocron = {
  name: 'infoxicator-content',
  loadModuleData: async ({ store, module, ownProps }) => {
    await configureIguazuSSR({ store, module, ownProps });
  },
};

export const loadDataAsProps = ({ store: { dispatch }, ownProps: { params: { postSlug } } }) => ({
  post: () => dispatch(queryCollection({ resource: 'post', id: { postSlug } })),
  RecentPosts: () => dispatch(queryModuleWithData('infoxicator-posts')),
});

loadDataAsProps.ssr = true;

export default connectAsync({ loadDataAsProps })(InfoxicatorContent);
