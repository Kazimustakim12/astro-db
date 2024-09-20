// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
	uri: import.meta.env.WPGRAPHQL_API_URL,
	cache: new InMemoryCache()
})

export default client
