import { graphql } from "@apollo/client/react/hoc";
import { ADD_POST } from "../../mutation/mutation";
import React, { useState } from "react";
import { GET_POSTS } from "../../queries/query";

const WithFeedMutation = graphql(ADD_POST);

const FeedForm = ({ mutate }) => {
	const [postContent, setPostContent] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		mutate({
			variables: { addPostPost: { text: postContent } },
			update: (store, { data: { addPost } }) => {
				const data = store.readQuery({
					query: GET_POSTS,
					variables: { postsFeedPage: 0, postsFeedLimit: 10 },
				});
				store.writeQuery({
					query: GET_POSTS,
					data: {
						postsFeed: {
							...data.postsFeed,
							posts: [addPost, ...data.postsFeed.posts],
						},
					},
					variables: { postsFeedPage: 0, postsFeedLimit: 10 },
				});
			},
		}).then((res) => console.log(res));
	}
	function handlePostContentChange(event) {
		let val = event.target.value;
		setPostContent(val);
	}
	return (
		<div className="postForm">
			<form onSubmit={handleSubmit}>
				<textarea
					value={postContent}
					onChange={handlePostContentChange}
					placeholder="Write your custom post!"
				/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default WithFeedMutation(FeedForm);
