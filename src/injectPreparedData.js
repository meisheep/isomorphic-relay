import { fromGraphQL } from 'react-relay/classic';

export default function injectPreparedData(environment, data) {
  const storeData = environment.getStoreData();

  for (const { query: concreteQuery, response } of data) {
    const query = fromGraphQL.Query(concreteQuery);
    storeData.handleQueryPayload(query, response);
  }
}
