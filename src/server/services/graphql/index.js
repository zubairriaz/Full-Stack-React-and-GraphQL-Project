import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import Resolver from "./resolvers";
import Schema from "./schema";
import { util } from "webpack";

export default (utils) => {
	const executableSchema = makeExecutableSchema({
		typeDefs: Schema,
		resolvers: Resolver.call(utils),
	});

	const server =
		new ApolloServer({
			schema: executableSchema,
			context: ({ req }) => req,
		});
	return server;
};
