import React from 'react';
import { holocronModule } from 'holocron';
import PropTypes from 'prop-types';
import reducer, { REQUEST, SUCCESS, FAILURE } from '../duck';
import BlogPost from './BlogPost';

const InfoxicatorContent = ({ moduleState }) => {
  if (moduleState.isLoading) return <div className="button is-loading">Loading</div>;
  if (moduleState.error) return <h1>Something went wrong...</h1>;
  return (
    <div className="container is-fluid">
      <BlogPost post={moduleState.data.post[0]} />
    </div>
  );
};
InfoxicatorContent.loadModuleData = async ({ store, fetchClient, ownProps }) => {
  store.dispatch({ type: REQUEST });
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
    data: PropTypes.array,
    error: PropTypes.shape({}),
  }).isRequired,
};

export default holocronModule({
  name: 'infoxicator-content',
  reducer,
})(InfoxicatorContent);
