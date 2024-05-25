import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient'; 

export const ContextProviders = ({ children }) => {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>

    );
};

ContextProviders.propTypes = {
    children: PropTypes.node,
    pageProps: PropTypes.object
};
