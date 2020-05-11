import { configureIguazuRPC, setProcedures } from 'iguazu-rpc';
import hash from 'object-hash';

export const configureIguazu = () => {
  configureIguazuRPC({
    getToState: (state) => state.getIn(['modules', 'infoxicator-content', 'procedures']),
  });
  setProcedures({
    readPost: {
      call: ({
        fetchClient = fetch,
        args: { api, ...restArgs } = { api: '', restArgs: {} },
      }) => fetchClient(api, restArgs)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          return response.text().then((text) => { throw new Error(text); });
        })
        .then((res) => res.json()),
      getResultFromCache: ({ args, cache }) => {
        const hashedArgs = hash(args);
        if (!cache.has(hashedArgs)) {
          throw new Error('make the call');
        }
        return cache.get(hashedArgs);
      },
      buildUpdatedCache: ({
        cache, args, result, error,
      }) => (
        typeof result === 'undefined' && typeof error === 'undefined'
          ? cache.remove(hash(args))
          : cache.set(hash(args), error || result)
      ),
    },
  });
};

export default configureIguazu;
