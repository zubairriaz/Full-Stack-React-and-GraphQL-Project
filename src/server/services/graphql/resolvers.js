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

const resolvers = {
	RootQuery: {
		posts(root, args, context) {
            logger.log('info','Post are returned')
			return posts;
		},
	},
	RootMutation: {
		addPost(root, { post, user }, context) {
			const postObj = { ...post, user, id: posts.length + 1 };
			posts.push(postObj);
            
			return postObj;
		},
	},
};

export default resolvers;
