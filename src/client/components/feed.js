import { graphql } from "@apollo/client/react/hoc";
import { feedQuery } from "../queries/query";
import React from "react";

const WithFeedQuery = graphql(feedQuery);

const Feed = ({ data }) => {
	const { error, loading, posts } = data;
	if (loading) {
		return <span>Loading ...</span>;
	}
	if (error) {
		return <div>{`The error has ocurred ${error} `}</div>;
	}
	return (
		<div className="feed">
			{posts.map((post, i) => (
				<div key={post.id} className="post">
					<div className="header">
						<img src={post.user?.avatar} />
						<h2>{post.user?.username}</h2>
					</div>
					<p className="content">{post.text}</p>
				</div>
			))}
		</div>
	);
};

export default WithFeedQuery(Feed);
