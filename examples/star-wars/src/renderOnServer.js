import IsomorphicRelay from 'isomorphic-relay';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay/classic';
import rootContainerProps from './rootContainerProps';

const GRAPHQL_URL = `http://localhost:8080/graphql`;

const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);

export default (res, next) => {
    IsomorphicRelay.prepareData(rootContainerProps, networkLayer).then(({data, props}) => {
        const reactOutput = ReactDOMServer.renderToString(
            <IsomorphicRelay.Renderer {...props} />
        );
        res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
            preloadedData: data,
            reactOutput
        });
    }).catch(next);
}
