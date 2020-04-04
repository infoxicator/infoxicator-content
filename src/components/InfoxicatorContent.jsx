import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { loadModule, RenderModule } from 'holocron';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorContent = ({ moduleState }) => {
  if (moduleState.isLoading) return <div className="button is-loading">Loading</div>;
  if (moduleState.data) {
    return (
      <Fragment>
        <Helmet
          link={[
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css' },
          ]}
          script={[{ src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js', type: 'text/javascript' }]}
        />
        <div className="container is-fluid">
          <BlogPost post={moduleState.data.post[0]} />
          <RenderModule
            moduleName="infoxicator-main"
            props={{}}
          />
        </div>
      </Fragment>
    );
  }
  return <h1>Something went wrong...</h1>;
};

const loadModuleData = async ({ store, fetchClient, ownProps }) => {
  const moduleState = store.getState().getIn(['modules', 'infoxicator-content']);
  if (moduleState.get('isComplete') && moduleState.get('data')) {
    return;
  }
  store.dispatch({ type: REQUEST });
  store.dispatch(loadModule('infoxicator-main'));
  try {
    const fastRes = await fetchClient(`http://www.infoxication.net/wp-json/wp/v2/posts/?slug=${ownProps.params.postSlug}`);
    const post = await fastRes.json();
    store.dispatch({
      type: SUCCESS,
      data: {
        post,
      },
    });
  } catch (err) {
    store.dispatch({
      type: FAILURE,
      error: err,
    });
  }
};

InfoxicatorContent.propTypes = {
  moduleState: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    data: PropTypes.shape({ post: PropTypes.array() }),
    error: PropTypes.shape({}),
  }).isRequired,
};

const shouldModuleReload = (oldProps, newProps) => {
  // console.log('called!');
  return oldProps.params.postSlug !== newProps.params.postSlug;
};

InfoxicatorContent.holocron = {
  name: 'infoxicator-content',
  reducer,
  loadModuleData,
  shouldModuleReload,
};

export default InfoxicatorContent;
