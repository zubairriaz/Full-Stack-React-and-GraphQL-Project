import { Query } from "@apollo/client/react/components";
import {  GET_POSTS } from "../../queries/query";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../loader";

export default function Feed() {
	let hasMore = true;
	let page = 0;
	function loadMore(fetchMore) {
		fetchMore({
			variables: {
				postsFeedPage: page + 1,
			},
			updateQuery(previousResult, { fetchMoreResult}) {
				console.log(previousResult , fetchMoreResult)
				if (!fetchMoreResult.postsFeed.posts.length) {
					hasMore = false
					console.log(previousResult)
					return previousResult;
				}

				page = page + 1;
				const newData = {
					postsFeed: {
						__typename: "PostFeed",
						posts: [
							...previousResult.postsFeed.posts,
							...fetchMoreResult.postsFeed.posts,
						],
					},
				};
				console.log(newData)
				return newData;
			},
		});
	}

	return (
		<Query
			query={GET_POSTS}
			variables={{ postsFeedPage: page, postsFeedLimit: 10 }}
		>
			{({ loading, error, data, fetchMore }) => {
				if (loading) {
					return <span><Loader></Loader></span>
				}
				if (error) {
					return <div>{`The error has ocurred ${error} `}</div>;
				}
				const { postsFeed } = data;
				const { posts } = postsFeed;
				return (
					<InfiniteScroll
						loadMore={() => loadMore(fetchMore)}
						hasMore={hasMore}
						isReverse={false}
						loader={
							<div className="loader" key={"loader"}>
								Loading ...
							</div>
						}
					>
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
					</InfiniteScroll>
				);
			}}
		</Query>
	);
}
