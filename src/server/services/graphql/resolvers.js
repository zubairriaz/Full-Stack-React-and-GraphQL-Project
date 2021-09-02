import logger from "../../helpers/logger";

const posts = [
	{
		id: 2,
		text: "Lorem ipsum",
		user: {
			avatar: "/uploads/avatar1.png",
			username: "Test User",
		},
	},
	{
		id: 1,
		text: "Lorem ipsum",
		user: {
			avatar: "/uploads/avatar2.png",
			username: "Test User 2",
		},
	},
];

function resolvers() {
	const { db } = this;
	const { Post, User, Chat, Message } = db.models;
	return {
		Post: {
			user(post, args, context) {
				return post.getUser();
			},
		},
		RootQuery: {
			posts(root, args, context) {
				logger.log("info", "Post are returned");
				return Post.findAll({ order: [["createdAt", "Desc"]] });
			},
			chat(root, { chatId }, context) {
				return Chat.findByPk(chatId, {
					include: [
						{
							model: User,
							required: true,
						},
						{
							model: Message,
						},
					],
				});
			},
			chats(root, args, context) {
				return User.findAll().then((users) => {
					if (!users.length) {
						return [];
					}

					const usersRow = users[0];

					return Chat.findAll({
						include: [
							{
								model: User,
								required: true,
								through: { where: { userId: usersRow.id } },
							},
							{
								model: Message,
							},
						],
					});
				});
			},
		},
		Message: {
			user(message, args, context) {
				return message.getUser();
			},
			chat(message, args, context) {
				return message.getChat();
			},
		},
		Chat: {
			messages(chat, args, context) {
				return chat.getMessages({ order: [["id", "ASC"]] });
			},
			users(chat, args, context) {
				return chat.getUsers();
			},
			lastMessage(chat,args,context){
				return chat.getMessages({limit: 1, order: [['id', 'DESC']]}).then((message) => {
				 return message[0];
			   });
			 },
		},
		RootMutation: {
			addPost(root, { post }, context) {
				return User.findAll().then((users) => {
					const userRow = users[0];
					return Post.create({ ...post }).then(async (newPost) => {
						const post = await newPost.setUser(userRow.id);
						return post;
					});
				});
			},
		
			addChat(root, { chat }, context) {
				logger.log({
					level: "info",
					message: "Message was created",
				});
				return Chat.create().then((newChat) => {
					return Promise.all([newChat.setUsers(chat.users)]).then(
						() => {
							return newChat;
						},
					);
				});
			},
			addMessage(root, { message }, context) {
				logger.log({
					level: "info",
					message: "Message was created",
				});

				return User.findAll().then((users) => {
					const usersRow = users[0];

					return Message.create({
						...message,
					}).then((newMessage) => {
						return Promise.all([
							newMessage.setUser(usersRow.id),
							newMessage.setChat(message.chatId),
						]).then(() => {
							return newMessage;
						});
					});
				});
			},
		},
	};
}

export default resolvers;
