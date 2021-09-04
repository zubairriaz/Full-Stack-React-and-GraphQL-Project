import { Mutation } from "@apollo/client/react/components";
import React from "react";
import { useState } from "react/cjs/react.development";
import { UPDATE_POST } from "../../mutation/mutation";
import { GET_POSTS } from "../../queries/query";

export default function UpdatePostMutation({ post }) {
	const [postContent, setPostContent] = useState(post?.text ? post.text : "");
	function changePostContent(value) {
		setPostContent(value);
	}

	return (
		<Mutation
			mutation={UPDATE_POST}
			update={(store, { data: { updatePost } }) => {
				const variables = { postsFeedPage: 0, postsFeedLimit: 10 };
				const query = { query: GET_POSTS, variables: variables };
				let data = store.readQuery(query);
				data = JSON.parse(JSON.stringify(data));
				for (let i = 0; i < data.postsFeed.posts.length; i++) {
					if (data.postsFeed.posts[i].id === postId) {
						data.postsFeed.posts[i].text = updatePost.text;
						break;
					}
				}
				store.writeQuery({ GET_POSTS, data });
			}}
			optimisticResponse={{
				__typename: "mutation",
				updatePost: {
					__typename: "Post",
					text: postContent,
				},
			}}
		>
			{(updatePost) =>
				React.Children.map(children, function (child, index) {
					return React.cloneElement(child, {
						updatePost,
						postContent,
						postId: post.id,
						changePostContent,
					});
				})
			}
		</Mutation>
	);
}
