import React, { useState } from "react";
import { Query, Mutation,  } from "@apollo/client/react/components";
import { GET_CHAT } from "../queries/query";
import { ADD_MESSAGE } from "../mutation/mutation";


export function ChatBox({ chatId, closeChat }) {
	const [chatInput, setChatInput] = useState("");
	function onChangeInput(event) {
		let val = event.target.value;
		setChatInput(val);
	}
	return (
		<Query
			key={"chatWindow" + chatId}
			query={GET_CHAT}
			variables={{ chatId }}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return error.message;

				const { chat } = data;
				return (
					<div className="chatWindow">
						<div className="header">
							<span>{chat.users[1].username}</span>
							<button
								className="close"
								onClick={() => closeChat(chatId)}
							>
								X
							</button>
						</div>
						<div className="messages">
							{chat.messages.map((message, j) => (
								<div
									key={"message" + message?.id}
									className={
										"message " +
										(message.user.id > 1 ? "left" : "right")
									}
								>
									{message.text}
								</div>
							))}
						</div>
						<Mutation
							mutation={ADD_MESSAGE}
							update={(store, { data: { addMessage } }) => {
								let data = store.readQuery({
									query: GET_CHAT,
									variables: { chatId: chatId },
								});
								store.writeQuery({
									query: GET_CHAT,
									variables: { chatId: chatId },
									data: {
										...data,
										chat: {
											...data.chat,
											messages: {
												addMessage,
												...data.chat.messages,
											},
										},
									},
								});
							}}
						>
							{(addMessage) => (
								<div className="footer">
									<input
										value={chatInput}
										className="input"
										placeholder="Write new TextMessage"
										onChange={onChangeInput}
									></input>
									<button
										className="close"
										onClick={() =>
											addMessage({
												variables: {
													addMessageMessage: {
														chatId: chatId,
														text: chatInput,
													},
												},
											})
										}
									>
										Send
									</button>
								</div>
							)}
						</Mutation>
					</div>
				);
			}}
		</Query>
	);
}
