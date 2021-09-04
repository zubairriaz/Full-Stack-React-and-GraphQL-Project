import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./assets/styles.css";

import Feed from "./components/feed/feed";
import FeedForm from "./components/feed/new-feed-form";
import Chat from "./components/chat/chat";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown);

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
