import { gql } from "@apollo/client";

export const feedQuery = gql`
	{
		posts {
			id
			text
			user {
				avatar
				username
			}
		}
	}
`;

export const CHAT_QUERY = gql`
	query {
		chats {
			id
			lastMessage {
				id
				text
			}
			users {
				avatar
				username
			}
		}
	}
`;

export const GET_CHAT = gql`
	query chat($chatId: Int!) {
		chat(chatId: $chatId) {
			id
			users {
				avatar
				username
			}
			messages {
				text
				user {
					username
				}
			}
		}
	}
`;
