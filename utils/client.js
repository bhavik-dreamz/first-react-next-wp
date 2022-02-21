// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    uri: "https://dddemo.net/wordpress/2022/awd",
    cache: new InMemoryCache(),
});

export default client;