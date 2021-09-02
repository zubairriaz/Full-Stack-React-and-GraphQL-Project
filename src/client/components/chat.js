import { Query } from "@apollo/client/react/components";
import { CHAT_QUERY, GET_CHAT } from "../queries/query";
import React, { useState } from "react";
import { ChatBox } from "./chatBox";

function Chat() {
	const [openChats, setOpenChat] = useState([]);

	function openChat(id) {
		let localOpenChats = openChats.slice();
		if (localOpenChats.indexOf(id) === -1) {
			if (localOpenChats.length > 2) {
				localOpenChats = localOpenChats.slice(1);
			}
			localOpenChats.push(id);
		}

		setOpenChat(localOpenChats);
	}

	function closeChat(id) {
		let localOpenChats = openChats.slice();

		const index = localOpenChats.indexOf(id);
		localOpenChats.splice(index, 1), setOpenChat(localOpenChats);
	}

	function shorten(text) {
		if (text.length > 12) {
			return text.substring(0, text.length - 9) + "...";
		}

		return text;
	}

	function usernamesToString(users) {
		const userList = users.slice(1);
		var usernamesString = "";

		for (var i = 0; i < userList.length; i++) {
			usernamesString += userList[i].username;
			if (i - 1 === userList.length) {
				usernamesString += ", ";
			}
		}
		return usernamesString;
	}
	return (
		<Query query={CHAT_QUERY}>
			{({ loading, error, data }) => {
				if (loading) return <span>...Loading</span>;
				if (error) return <span>...{error}</span>;

				const { chats } = data;
				return (
					<div className="wrapper">
						<div className="openChats">
							{openChats.map((chatId, i) => (
								<ChatBox
                                    key = {chatId}
									chatId={chatId}
									closeChat={(id) => closeChat(id)}
								></ChatBox>
							))}
						</div>
						<div className="chats">
							{chats.map((chat, i) => (
								<div
									key={chat.id}
									className="chat"
									onClick={() => openChat(chat.id)}
								>
									<div className="header">
										<img
											src={
												chat.users.length > 2
													? "/public/group.png"
													: chat.users[1].avatar
											}
										/>
										<div>
											<h2>
												{shorten(
													usernamesToString(
														chat.users,
													),
												)}
											</h2>
											<span>
												{chat.lastMessage &&
													shorten(
														chat.lastMessage.text,
													)}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);
			}}
		</Query>
	);
}
export default Chat;
