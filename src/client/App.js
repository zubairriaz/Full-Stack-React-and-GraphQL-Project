import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./assets/styles.css";

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

function App() {
	const [cPosts, setPost] = useState(posts);
	const [postContent, setPostContent] = useState("");
	function handleSubmit() {
		event.preventDefault();
		let newPost = {
			id: cPosts.length + 1,
			text: postContent,
			user: {
				avatar: "/uploads/avatar2.png",
				username: "Test User 1",
			},
		};
		setPost([newPost, ...cPosts]);
	}
	function handlePostContentChange(event) {
		let value = event.target.value;
		setPostContent(value);
	}
	return (
		<div className="container">
			<Helmet>
				<title>Graphbook-Feed</title>
				<meta
					name="description"
					content="Newsfeed of all the friends"
				></meta>
			</Helmet>
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
			<div className="feed">
				{cPosts.map((post, i) => (
					<div key={post.id} className="post">
						<div className="header">
							<img src={post.user.avatar} />
							<h2>{post.user.username}</h2>
						</div>
						<p className="content">{post.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
