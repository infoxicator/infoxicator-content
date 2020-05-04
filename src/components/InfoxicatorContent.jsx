import React, { useEffect } from 'react';
import { configureIguazuSSR, queryModuleWithData } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import reducer from '../duck';
import BlogPost from './BlogPost';
import ErrorPage from './ErrorPage';
import LoadingSkeleton from './LoadingSkeleton';

const InfoxicatorContent = ({
  isLoading, loadedWithErrors, post, SideBar, router: { location },
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
  if (loadedWithErrors()) return <ErrorPage />;
  return (
    <React.Fragment>
      <BlogPost post={post[0]} SideBar={SideBar} />
    </React.Fragment>
  );
};

function loadDataAsProps({ store: { dispatch }, ownProps: { params: { postSlug } } }) {
  const apiUrl = `https://www.infoxication.net/wp-json/wp/v2/posts/?slug=${postSlug}`;
  return {
    post: () => dispatch(queryProcedureResult({ procedureName: 'readPost', args: { api: apiUrl } })),
    SideBar: () => dispatch(queryModuleWithData('infoxicator-main')),
  };
}

loadDataAsProps.ssr = true;
InfoxicatorContent.loadDataAsProps = loadDataAsProps;

if (!global.BROWSER) {
  InfoxicatorContent.loadModuleData = configureIguazuSSR;
}


InfoxicatorContent.propTypes = {
  isLoading: PropTypes.func.isRequired,
  loadedWithErrors: PropTypes.func.isRequired,
  post: PropTypes.arrayOf(PropTypes.object),
  SideBar: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  router: PropTypes.shape({ location: PropTypes.shape({}) }).isRequired,
};

InfoxicatorContent.defaultProps = {
  post: [],
  SideBar: {},
};

InfoxicatorContent.holocron = {
  name: 'infoxicator-content',
  reducer,
};

export default connectAsync({ loadDataAsProps })(InfoxicatorContent);
