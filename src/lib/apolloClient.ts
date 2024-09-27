// import pkg from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client/core/core.cjs'
const client = new ApolloClient({
	uri: 'https://dev.dbinvesting.com/graphql',
	cache: new InMemoryCache({})
})

export default client
