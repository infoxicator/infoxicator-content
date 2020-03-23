import React, { Fragment } from 'react';
import { compose } from 'redux';
import { RenderModule, holocronModule, loadModule } from 'holocron';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import PropTypes from 'prop-types';
import { queryProcedureResult } from 'iguazu-rpc';
import Helmet from 'react-helmet';
import reducer from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorContent = ({ isLoading, loadedWithErrors, post }) => {

  if (isLoading()) return <div className="button is-loading">Loading</div>;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <Fragment>
      <Helmet
        link={[
          { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css' },
        ]}
        script={[{ src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js', type: 'text/javascript' }]}
      />
      <div className="container is-fluid">
        <BlogPost post={post[0]} />
        {/* <RenderModule
          moduleName="infoxicator-main"
          props={{}}
        /> */}
      </div>
    </Fragment>
  );
};

function loadDataAsProps({ store: { dispatch }, ownProps: { params: { postSlug } } }) {
  const apiUrl = `http://www.infoxication.net/wp-json/wp/v2/posts/?slug=${postSlug}`;
  return {
    post: () => dispatch(queryProcedureResult({ procedureName: 'readPost', args: { api: apiUrl } })),
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
};

InfoxicatorContent.defaultProps = {
  post: [],
};

// const load = () => (dispatch) => dispatch(loadModule('my-module'));

export default compose(
  connectAsync({ loadDataAsProps }),
  holocronModule({
    name: 'infoxicator-content',
    // load,
    // options: { ssr: true },
    reducer,
  })
)(InfoxicatorContent);
