import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { loadModule } from 'holocron';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';
import ErrorPage from './ErrorPage';
import LoadingSkeleton from './LoadingSkeleton';

const InfoxicatorContent = ({
  moduleState, router: { location },
}) => {
  const { isLoading, error, post } = moduleState;
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
      });
    } catch (err) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  if (isLoading) return <LoadingSkeleton />;
  if (error || (!Array.isArray(post) || !post.length)) return <ErrorPage />;
  return (
    <Container fluid="md" className="mt-5">
      <BlogPost post={post[0]} />
    </Container>
  );
};

const loadModuleData = async ({ store: { dispatch, getState }, fetchClient, ownProps: { params: { postSlug } } }) => {
  const apiUrl = `https://www.infoxication.net/wp-json/wp/v2/posts/?slug=${postSlug}`;
  const moduleState = getState().getIn(['modules', 'infoxicator-content']);
  if (moduleState.get('isComplete') && moduleState.get('post')) {
    return;
  }
  try {
    dispatch({ type: REQUEST });
    const response = await fetchClient(apiUrl);
    const post = await response.json();
    dispatch(loadModule('infoxicator-main'));
    dispatch({
      type: SUCCESS,
      data: post,
    });
  } catch (err) {
    dispatch({
      type: FAILURE,
      error: err,
    });
  }
};

const shouldModuleReload = (oldProps, newProps) => oldProps.router.location.pathname !== newProps.router.location.pathname;


InfoxicatorContent.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.shape({ location: PropTypes.shape({}) }).isRequired,
};

InfoxicatorContent.defaultProps = {
  post: [],
};

InfoxicatorContent.holocron = {
  name: 'infoxicator-content',
  reducer,
  shouldModuleReload,
  loadModuleData,
};

export default InfoxicatorContent;
