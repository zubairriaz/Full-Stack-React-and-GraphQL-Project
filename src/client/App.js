import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./assets/styles.css";

import Feed from "./components/feed";
import FeedForm from "./components/new-feed-form";
import Chat from "./components/chat";

function App() {
	return (
		<div className="container">
			<Helmet>
				<title>Graphbook-Feed</title>
				<meta
					name="description"
					content="Newsfeed of all the friends"
				></meta>
			</Helmet>
			<FeedForm></FeedForm>
			<Feed></Feed>
			<Chat></Chat>
		</div>
	);
}

export default App;
