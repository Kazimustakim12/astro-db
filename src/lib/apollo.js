import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				posts: relayStylePagination()
			}
		}
	}
})

const client = new ApolloClient({
	uri: 'https://wp.holidaysinmalta.eu/graphql',
	cache
})

export default client
