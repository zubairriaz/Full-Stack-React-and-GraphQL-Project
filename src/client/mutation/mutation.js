import { gql } from "@apollo/client";

export const ADD_POST = gql`
	mutation addPost($addPostPost: PostInput!) {
		addPost(post: $addPostPost) {
			id
			text
			user {
				avatar
				username
			}
		}
	}
`;

export const ADD_MESSAGE = gql`
	mutation addMessage($addMessageMessage: MessageInput!) {
		addMessage(message: $addMessageMessage) {
			id
			text
			user {
				username
			}
		}
	}
`;

export const UPDATE_POST = gql`
	mutation up($updatePostPost: PostInput, $updatePostPostId: Int) {
		updatePost(post: $updatePostPost, postId: $updatePostPostId) {
			id
			text
		}
	}
`;
