import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: "http://localhost:8000/graphql" });

const apolloLink = ApolloLink.from([
	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(`[GraphQL error]: Message: ${message}, Location: 
            ${locations}, Path: ${path}`),
			);
			if (networkError) {
				console.log(`[Network error]: ${networkError}`);
			}
		}
	}),
	new HttpLink({ uri: "http://localhost:8000/graphql" }),
]);

export const client = new ApolloClient({
	cache,
	link: apolloLink,
});
