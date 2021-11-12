import React, { Component } from 'react'
import {
    ApolloProvider as App
} from "@apollo/client";

import { apolloClient} from "../config";

export class ApolloProvider extends Component {
    render() {
        return (
            <App client={apolloClient}>{this.props.children}</App>
        )
    }
}

export default ApolloProvider;
