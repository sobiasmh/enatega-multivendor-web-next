import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from '@apollo/client';
import { ConfigurationProvider } from "./Configuration";
import { LocationProvider } from "./Location";
import setupAplloClient from "../lib/apollo/index";

export const ContextProviders = ({ children }) => {
    const client = setupAplloClient();

    return (
        <ApolloProvider client={client}>
            <ConfigurationProvider>
                <LocationProvider>

                    {children}
                </LocationProvider>
            </ConfigurationProvider>
        </ApolloProvider>

    );
};

ContextProviders.propTypes = {
    children: PropTypes.node,
    pageProps: PropTypes.object
};
